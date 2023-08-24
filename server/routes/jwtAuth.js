const router = require('express').Router();
const pool = require('../db');
const bcrypt = require('bcrypt');
const jwtGenerator = require('../utils/jwtGenerator');
const validInfo = require('../middleware/validInfo');
const authorization = require('../middleware/authorization');

/**
 * Register route - registers a new user. 
 * 
 * This route checks whether the user exists. If so, it returns an 401 error.
 * If the user does not exist, then the user password is hashed, a token is created, 
 * and the user information (name, email, bycryptPassowrd) is entered into the 
 * database.
 * 
 * If the user exists, returns a 401 error.
 * If the function fails, returns a 500 error.
 * 
 * To try this in Postman:
 * POST: http://localhost:5000/auth/register
 * Body (raw, json):
 * {
 *      "name":"jacob",
 *      "email":"twotwo@gmail.com",
 *      "password":"kthl8822"
 * } 
 * Should provide a token.
 **/
router.post("/register", validInfo, async (req, res) => {
    try {
        // 1. Destructure req.body (name, email, password).
        const { name, email, password } = req.body;

        // 2. Check if user exist (if user exists then throw err).
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [email]);

        if (user.rows.length !== 0) { // A user exists.
            return res.status(401).json("User already exist"); // Note: Status code 401 is unauthenticated. Status code 403 is unauthorized.
        }

        // 3. Hash and salt the user password using bcrypt. (bcrypt is a password hashing function: https://en.wikipedia.org/wiki/Bcrypt)
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);

        const bcryptPassword = await bcrypt.hash(password, salt);

        // 4. Enter the new user inside our database.
        const newUser = await pool.query("INSERT INTO users (user_name, user_email, user_password) VALUES($1, $2, $3) RETURNING *", [name, email, bcryptPassword]);

        // 5. Generating our JWT token.
        const token = jwtGenerator(newUser.rows[0].user_id);
        res.json({ token });

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

/**
 * Login route - logs a valid user in.
 * 
 * This route checks if the user is valid by checking if the user email is 
 * valid and then comparing the incoming passowrd to the database password. If 
 * the user valid, a jwt token is generated and provided.
 * 
 * If the user is not valid, returns a 401 error.
 * If the function fails, returns a 500 error.
 * 
 * To try this in Postman:
 * POST: http://localhost:5000/auth/login
 * Body (raw, json):
 * {
 *      "email":"twotwo@gmail.com",
 *      "password":"kthl8822"
 * } 
 * Should provide a token.
 **/
router.post("/login", validInfo, async (req, res) => {
    try {
        // 1. Destructure the req.body.
        const { email, password } = req.body;

        // 2. Step 2: Check if the user exists (if user exists then throw error).
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
            email
        ]);
        if (user.rows.length === 0) {
            return res.status(401).json("Invalid Credential");
        }

        // 3. Check if the incoming password matches the database password.
        const validPassword = await bcrypt.compare(
            password,
            user.rows[0].user_password
        );

        if (!validPassword) {
            return res.status(401).json("Password or Email is incorrect");
        }

        // 4. Give the JWT token to the user.
        const token = jwtGenerator(user.rows[0].user_id);
        return res.json({ token });

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

/**
 * Verify route - checks that a user is authorized. 
 * 
 * If the function fails, returns a 500 error.
 * 
 * To try this in Postman:
 * GET: http://localhost:5000/auth/verify
 * Header:
 *      key: token
 *      value: the actual token
 * 
 * Returns true or false.
 **/
router.get("/verify", authorization, (req, res) => {
    try {
        res.json(true);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

module.exports = router;
