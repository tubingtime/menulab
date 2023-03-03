const jwt = require("jsonwebtoken");
require('dotenv').config(); // Allow us to access our env variables.

function jwtGenerator(user_id) {
    const payload = {
        user: user_id
    };

    return jwt.sign(payload, process.env.jwtSecret, { expiresIn: "480hr" });
}

module.exports = jwtGenerator;
