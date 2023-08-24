const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

// Middleware
app.use(express.json()); // req.body
app.use(cors());


// ROUTES //

// Register and login routes.
// This code means that when we use /auth we are going to hit the specified route.
app.use("/auth", require("./routes/jwtAuth"));

// Dashboard route.
app.use("/dashboard", require("./routes/dashboard"));

app.use("/menus", require("./routes/dashboard"));

app.listen(process.env.nodePort, () => {
    console.log("server is running on port: " + process.env.nodePort);
})
