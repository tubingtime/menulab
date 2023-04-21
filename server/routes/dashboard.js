const router = require("express").Router();
const pool = require("../db");
const authorization = require('../middleware/authorization');
const cloudinary = require("../cloudinary");
const express = require("express");
const multer = require("multer");
const path = require("path");
const upload = multer({ dest: "public/images" });

// Set up the storage engine for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./persist-image");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});



/**
 * This checks the user authorization against the user table.
 * 
 * To try this in Postman:
 * GET: http://localhost:5000/dashboard
 * Header:
 *      key: token
 *      value: the actual token
 * 
 * Returns the username.
 */
router.get('/', authorization, async (req, res) => {
    try {
        // req.user has the payload.
        // res.json(req.user); // Returns the uuid for the user.
        const user = await pool.query(
            "SELECT user_name FROM users WHERE user_id = $1", [req.user]);
        res.json(user.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server error');
    }
})

/**
 * Creates a Menu.
 * 
 * To try this in Postman:
 * POST: http://localhost:5000/dashboard/menus
 * Header:
 *      key: token
 *      value: the actual token
 * Body:
 *      {
 *        "name": "The Whispers Saloon"
 *      }
 */
router.post('/menus', authorization, async (req, res) => {
    try {
        const { name } = req.body;
        const addMenu = await pool.query(
            "INSERT INTO menus(name, user_id) VALUES($1, $2)",
            [name, req.user]);
        res.json("Menu created.");
    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server error');
    }
})

/**
 * Delete a Menu.
 * 
 * To try this in Postman:
 * DELETE: http://localhost:5000/dashboard/menus/:menu_id
 * Header: 
 *      key: token
 *      value: the actual token
 * Params:
 *      replace menu_id with id we want to delete
 */
router.delete("/menus/:menu_id", authorization, async (req, res) => {
    try {
        const { menu_id } = req.params;
        const deleteMenu = await pool.query(
            "DELETE FROM menus WHERE menu_id = $1", [menu_id]);
        res.json("Menu deleted.");
    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server error');
    }
})

/**
 * Get all Menus.
 * 
 * To try this in Postman: 
 * GET: http://localhost:5000/dashboard/menus
 * Header: 
 *      key: token
 *      value: the actual token
 */
router.get("/menus", authorization, async (req, res) => {
    try {
        const getMenus = await pool.query(
            "SELECT * FROM menus WHERE user_id=$1", [req.user]);
        res.json(getMenus.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server error');
    }
})

/**
 * Add a new Item.
 * 
 * To try this in Postman:
 * POST: http://localhost:5000/dashboard/item
 * Header:
 *      key: token
 *      value: the actual token
 * Body:
 *      "name": "",
 *      "description": "", (<-- This field is optional)
 *      "price": ""
 *      "photo_reference": ""
 */
router.post("/item", authorization, async (req, res) => {
    try {
        const name = req.body.name;
        const description = req.body.description;
        const price = req.body.price;
        // const picture = await cloudinary.uploader.upload(req.body.photo_reference);
        const createMenuItem = await pool.query(
          "INSERT INTO items(name, description, price, user_id) VALUES($1, $2, $3) RETURNING item_id",
          /* picture.secure_url, */
          [name, description, price, req.user]
        );
        res.json(createMenuItem.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server error');
    }
})

router.post("/persist-image", authorization, upload.single("file"), async (request, response) => {
  try {
    const photo_reference = request.file.path;
    const photoUrl = path.join(__dirname, "..", photo_reference);

    // Upload the image to Cloudinary
    const photo = await cloudinary.uploader.upload(photoUrl);

    // Insert the image URL into the database
    const insertQuery = "INSERT INTO images (cloudinary_id, image_url) VALUES ($1, $2) RETURNING *";
    const values = [photo.public_id, photo.secure_url];
    const result = await pool.query(insertQuery, values);

    // Return the inserted row as a response
    const insertedRow = result.rows[0];
    response.status(201).json({
      status: "success",
      data: {
        message: "Image Uploaded Successfully",
        cloudinary_id: insertedRow.cloudinary_id,
        image_url: insertedRow.image_url,
      },
    });
  } catch (error) {
    console.error(error);
    response.status(500).json({
      status: "error",
      message: "Failed to upload image",
      error: error.message,
    });
  }
});


/**
 * Retrieve Image.
 * 
 * To try this in Postman:
 * POST: http://localhost:5000/dashboard/persist-image
 * Header:
 *      key: token
 *      value: the actual token
 *      Content-Type: application/json
 *      
 */
router.get("/retrieve-image/:cloudinary_id", (request, response) => {
  // data from user
  const { cloudinary_id } = request.params;

  pool.connect((err, client) => {
    // query to find image
    const query = "SELECT * FROM images WHERE cloudinary_id = $1";
    const value = [cloudinary_id];

    // execute query
    client
      .query(query, value)
      .then((output) => {
        response.status(200).send({
          status: "success",
          data: {
            id: output.rows[0].cloudinary_id,
            url: output.rows[0].image_url,
          },
        });
      })
      .catch((error) => {
        response.status(401).send({
          status: "failure",
          data: {
            message: "could not retrieve record!",
            error,
          },
        });
      });
  });
});



//TODO: Security: make sure users can only delete / assign their own items.

/**
 * Assign a Item to a Menu.
 * 
 * To try this in Postman:
 * POST: http://localhost:5000/dashboard/menus/item/:item_id
 * Header:
 *      key: token
 *      value: the actual token
 * Params: item_id
 * Body:
 *      "menu_id": ""
 */
router.post("/menus/item/:item_id", authorization, async (req, res) => {
    try {
        const menu_id = req.body.menu_id;
        const item_id = req.params.item_id;
        const assignMenuItem = await pool.query(
            "INSERT INTO menu_assignments(menu_id, item_id) \
            VALUES((SELECT menu_id FROM menus WHERE menu_id = $1), \
            (SELECT item_id FROM items WHERE item_id = $2))",
            [menu_id, item_id]);
        res.json("Item assigned.");
    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server error');
    }
})

/**
 * Get all the MenuItems for ALL Menus.
 * 
 * To try this in Postman:
 * POST: http://localhost:5000/dashboard/items
 * Header:
 *      key: token
 *      value: the actual token
 * Params: menu_id
 */
router.get("/items", authorization, async (req, res) => {
    try {
        const getItems = await pool.query(
            "SELECT * FROM items WHERE user_id = $1",
            [req.user]);
        res.json(getItems.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server error');
    }
})

/**
 * Get all the MenuItems in a SPECIFIC Menu.
 * 
 * To try this in Postman:
 * POST: http://localhost:5000/dashboard/menus/:menu_id
 * Header:
 *      key: token
 *      value: the actual token
 * Params: menu_id
 */
router.get("/menus/:menu_id", authorization, async (req, res) => {
    try {
        const menu_id = req.params.menu_id;
        // TODO: Fix this so that it returns for a specific user and menu.
        const getMenuItems = await pool.query(
            "SELECT items.name, items.description, items.price, items.item_id \
            FROM items JOIN menu_assignments \
            ON items.item_id = menu_assignments.item_id \
            WHERE menu_assignments.menu_id =$1",
            [menu_id]
        );
        res.json(getMenuItems.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server error');
    }
})

/**
 * Unassign an Item from a Menu.
 * 
 * To try this in Postman:
 * DELETE: http://localhost:5000/dashboard/menus/item/:item_id
 * Header:
 *      key: token
 *      value: the actual token
 * Params: item_id
 * Body:
 *      "menu_id": ""
 */
router.delete("/menus/item/:item_id", authorization, async (req, res) => {
    try {
        const item_id = req.params.item_id;
        const menu_id = req.body.menu_id;
        const menus = await pool.query(
            "DELETE FROM menu_assignments WHERE menu_id = $1 AND item_id = $2",
            [menu_id, item_id]);
        res.json("Item unassigned.");
    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server error');
    }
})

/**
 * Delete an item.
 * 
 * To try this in Postman:
 * DELETE: http://localhost:5000/dashboard/item/:item_id
 * Header:
 *      key: token
 *      value: the actual token
 * Params: item_id
 */
router.delete("/item/:item_id", authorization, async (req, res) => {
    try {
        const item_id = req.params.item_id;
        const menus = await pool.query(
            "DELETE FROM items WHERE item_id = $1", [item_id]);
        res.json("Item deleted.");
    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server error');
    }
})

/**
 * Edit an item.
 * 
 * To try this in Postman:
 * PUT: http://localhost:5000/dashboard/item/:item_id
 * Header:
 *      key: token
 *      value: the actual token
 * 
 * 
 * Params: item_id
 */
router.put("/item/:item_id", async (req, res) => {
    try {
        const item_id = req.params.item_id;

        let item_name = req.body.name;
        let item_description = req.body.description;
        let item_price = req.body.price;

        const item = await pool.query("SELECT * FROM items WHERE item_id=$1", [item_id]);

        if (item_name == null) {
            item_name = item.rows[0].name;
        }
        if (item_description == null) {
            item_description = item.rows[0].description;
        }
        if (item_price == null) {
            item_price = item.rows[0].price;
        }

        const updateItem = await pool.query("UPDATE items SET name=$1, description=$2, price=$3 WHERE item_id=$4",
            [item_name, item_description, item_price, item_id]);

        res.json("Item was updated!");
    } catch (err) {
        console.error(err.message);
    }
});

/* Add a photo to an Item. */
router.put('/items/:item_id/photo', async (req, res) => {
    const { item_id } = req.params;
    const { photo_reference } = req.body;

    try {
        const result = await pool.query(
            'UPDATE items SET photo_reference = $1 WHERE item_id = $2 RETURNING *',
            [photo_reference, item_id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error adding photo to item.' });
    }
});
/**
 * Edit an Menu Name.
 * 
 * To try this in Postman:
 * PUT: http://localhost:5000/dashboard/menu/:menu_id
 * Header:
 *      key: token
 *      value: the actual token
 * 
 * 
 * Params: menu_id
 */
router.put("/menu/:menu_id", async (req, res) => {
    try {
        const menu_id = req.params.menu_id;

        let menu_name = req.body.name;

        const menu = await pool.query("SELECT * FROM menus WHERE menu_id=$1", [menu_id]);

        if (menu_name == null) {
            menu_name = menu.rows[0].name;
        }

        const updateMenu = await pool.query("UPDATE menus SET name=$1 WHERE menu_id=$2",
            [menu_name, menu_id]);

        res.json("Menu name was updated!");
    } catch (err) {
        console.error(err.message);
    }
});

/**
 * Get a Menu Name from a menu_id.
 * 
 * To try this in Postman:
 * PUT: http://localhost:5000/dashboard/menu/:menu_id
 * Header:
 *      key: token
 *      value: the actual token
 * 
 * 
 * Params: menu_id
 */
router.get("/menus/name/:menu_id", async (req, res) => {
    try {
        const menu_id = req.params.menu_id;

        const menu = await pool.query("SELECT * FROM menus WHERE menu_id=$1", [menu_id]);

        const menu_name = menu.rows[0].name;
        res.json(menu_name);
    } catch (err) {
        console.error(err.message);
    }
});


/**
 * Creates a Menu Section
 * 
 * To try this in Postman:
 * POST: http://localhost:5000/dashboard/section/:menu_id
 * Header:
 *      key: token
 *      value: the actual token
 * Body:
 *      {
 *        "name": "The Whispers Saloon"
 *      }
 */
router.post('/section/:menu_id', authorization, async (req, res) => {
    try {
        const { name } = req.body;
        const { menu_id } = req.params;
        const addSection = await pool.query(
            "INSERT INTO sections(name, menu_id) VALUES($1, $2)",
            [name, menu_id]);
        res.json("Section created.");
    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server error');
    }
})

/**
 * Edit a Section Name.
 * 
 * To try this in Postman:
 * PUT: http://localhost:5000/dashboard/section/:section_id
 * Header:
 *      key: token
 *      value: the actual token
 * 
 * 
 * Params: section_id
 */
router.put("/section/:section_id", async (req, res) => {
    try {
        const section_id = req.params.section_id;

        let section_name = req.body.name;

        const section = await pool.query("SELECT * FROM sections WHERE section_id=$1", [section_id]);

        if (section_name == null) {
            section_name = section.rows[0].name;
        }

        const updateSection = await pool.query("UPDATE sections SET name=$1 WHERE section_id=$2",
            [section_name, section_id]);

        res.json("Section name was updated!");
    } catch (err) {
        console.error(err.message);
    }
});

/**
 * Delete a Section.
 * 
 * To try this in Postman:
 * DELETE: http://localhost:5000/dashboard/section/:menu_id
 * Header: 
 *      key: token
 *      value: the actual token
 * Params:
 *      replace menu_id with id we want to delete
 */
router.delete("/section/:section_id", authorization, async (req, res) => {
    try {
        const { section_id } = req.params;
        const deleteSection = await pool.query(
            "DELETE FROM sections WHERE section_id = $1", [section_id]);
        res.json("Section deleted.");
    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server error');
    }
})

/**
 * Get all Sections associated with menu.
 * 
 * To try this in Postman: 
 * GET: http://localhost:5000/dashboard/sections/:menu_id
 * Header: 
 *      key: token
 *      value: the actual token
 */
router.get("/sections/:menu_id", authorization, async (req, res) => {
    try {
        const menu_id = req.params.menu_id;
        const getSections = await pool.query(
            "SELECT * FROM sections WHERE menu_id=$1", [menu_id]);
        res.json(getSections.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server error');
    }
})


/**
 * Get the section associated with an item.
 * 
 * To try this in Postman: 
 * GET: http://localhost:5000/dashboard/section/item/:item_id
 * Header: 
 *      key: token
 *      value: the actual token
 */
router.get("/section/item/:item_id", authorization, async (req, res) => {
    try {
        const item_id = req.params.item_id;
        const getSection = await pool.query(
            "SELECT section_id FROM section_assignments WHERE item_id = $1",
            [item_id]);
        res.json(getSection.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server error');
    }
})

/**
 * Assign a Item to a Section.
 * 
 * To try this in Postman:
 * POST: http://localhost:5000/dashboard/section/item/:item_id
 * Header:
 *      key: token
 *      value: the actual token
 * Params: item_id
 * Body:
 *      "section_id": ""
 */
router.post("/section/item/:item_id", authorization, async (req, res) => {
    try {
        const new_section_id = req.body.section_id;
        const item_id = req.params.item_id;
        const { rows } = await pool.query(
            `
            WITH current_assignment AS (
              SELECT section_id
              FROM section_assignments
              WHERE item_id = $1
            ), removed_assignment AS (
              DELETE FROM section_assignments
              WHERE item_id = $1
                AND section_id = (SELECT section_id FROM current_assignment)
              RETURNING *
            ), inserted_assignment AS (
              INSERT INTO section_assignments (section_id, item_id)
              VALUES ($2, $1)
              RETURNING *
            )
            SELECT *
            FROM removed_assignment
            FULL OUTER JOIN inserted_assignment
            ON true;
            `,
            [item_id, new_section_id]
        );
        res.json("Item assigned to section.");
    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server error');
    }
})

/**
 * Unassign an Item from a Section.
 * 
 * To try this in Postman:
 * DELETE: http://localhost:5000/dashboard/section/item/:item_id
 * Header:
 *      key: token
 *      value: the actual token
 * Params: item_id
 * Body:
 *      "section_id": ""
 */
router.delete("/section/item/:item_id", authorization, async (req, res) => {
    try {
        const section_id = req.body.section_id;
        const item_id = req.params.item_id;
        const unassignMenuItem = await pool.query(
            "DELETE FROM section_assignments WHERE section_id = $1 AND item_id = $2",
            [section_id, item_id]);
        res.json("Item unassigned from section.");
    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server error');
    }
})

/**
 * Get all the MenuItems in a SPECIFIC Menu in a SPECIFIC section.
 * 
 * To try this in Postman:
 * GET: http://localhost:5000/dashboard/section/:section_id
 * Header:
 *      key: token
 *      value: the actual token
 * Params: section_id
 */
router.get("/section/:section_id", authorization, async (req, res) => {
    try {
        const section_id = req.params.section_id;
        const getSectionItems = await pool.query(
            "SELECT items.name, items.description, items.price, items.item_id \
            FROM items JOIN section_assignments \
            ON items.item_id = section_assignments.item_id \
            WHERE section_assignments.section_id =$1",
            [section_id]
        );
        res.json(getSectionItems.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server error');
    }
})

module.exports = router;


