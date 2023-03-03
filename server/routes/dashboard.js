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

module.exports = router;
