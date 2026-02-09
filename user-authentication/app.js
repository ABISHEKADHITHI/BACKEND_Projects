const express = require("express");
const connectdb = require("./config/db")
require("dotenv").config();

const app = express();

connectdb();

app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));

module.exports = app;