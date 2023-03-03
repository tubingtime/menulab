const router = require("express").Router();
const pool = require("../db");
const authorization = require('../middleware/authorization');

/**
 * TODO: Add a description of what this actually does.
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
    const user = await pool.query("SELECT user_name FROM users WHERE user_id = $1", [req.user]);

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
 * GET: http://localhost:5000/dashboard/menus
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
    //res.send('hello menus');
    //res.json(user.rows[0]);
    const { name } = req.body;
    const newMenu = await pool.query("INSERT INTO menus(name, user_id) VALUES($1, $2)",
      [name, req.user]);
    res.json(newMenu.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server error');
  }
})

router.delete("/menus/:menu_id", authorization, async(req, res) => {
  try {
    const { menu_id } = req.params;
    const deleteMenu = await pool.query("DELETE FROM menus WHERE menu_id = $1", [menu_id]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server error');
  }
})

/* Get all menus */
router.get("/menus", authorization, async(req, res) =>{
  try {
    const menus = await pool.query("SELECT * FROM menus WHERE user_id = $1", [req.user]);
    res.json(menus.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server error');
  }
})

/* Add a new menu item */
router.post("/item/", authorization, async(req, res) =>{
  try {
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
    const menus = await pool.query("INSERT INTO menu_items(name, description, price) VALUES($1, $2, $3)",
      [name, description, price]);
    res.json("Menu item created");
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server error');
  }
})

//TODO: Security: make sure users can only delete / assign their own items.

/* Assign an item to a menu */
router.post("/menus/item/:item_id", authorization, async(req, res) =>{
  try {
    const menu_id = req.body.menu_id;
    const item_id = req.params.item_id;
    const item_assignment = await pool.query(`INSERT INTO menu_assignments(menu_id, menu_item_id) 
    VALUES((SELECT menu_id FROM menus WHERE menu_id = $1), 
    (SELECT menu_item_id FROM menu_items WHERE menu_item_id = $2));`,
      [menu_id, item_id]);
    res.json("Menu item assigned to");
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server error');
  }
})

/* Unassign a item from a menu */
router.delete("/menus/item/:item_id", authorization, async(req, res) =>{
  try {
    const item_id = req.params.item_id;
    const menu_id = req.body.menu_id;
    const menus = await pool.query("DELETE FROM menu_assignments WHERE menu_id = $1 AND menu_item_id = $2",
      [menu_id, item_id]);
    res.json("Menu item assignment deleted");
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server error');
  }
})

/* Delete an item */
router.delete("/item/:item_id", authorization, async(req, res) =>{
  try {
    const item_id = req.params.item_id;
    const menus = await pool.query("DELETE FROM menu_items WHERE menu_item_id = $1", [item_id]);
    res.json("Menu item deleted");
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server error');
  }
})



module.exports = router;
