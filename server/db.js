const Pool = require("pg").Pool
require("dotenv").config();
const cloudinary = require('cloudinary').v2;

const pool = new Pool({
    user: process.env.user,
    password: process.env.password,
    host: process.env.host,
    port: process.env.postgresPort,
    database: process.env.database
});

cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret
  });

module.exports = pool;
