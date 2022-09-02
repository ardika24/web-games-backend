require("dotenv").config();

const express = require("express");
const cors = require("cors");
const passport = require("./lib/passport");
const apiRouter = require("./routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(passport.initialize());

// @Routes /api

app.use("/api", apiRouter);

module.exports = app;
