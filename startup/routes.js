const express = require("express");
const accounts = require("../routes/accounts");
const users = require("../routes/users");
const rewards = require("../routes/rewards");
const cors = require("cors");
const error = require("../middleware/error");
const path = require("path");

module.exports = function(app) {
  app.use(cors());
  app.use(express.json());
  app.use(express.static(path.join(__dirname, `client/build`)));
  app.use("/api/users", users);
  app.use("/api/accounts", accounts);
  app.use("/api/rewards", rewards);
  app.use(error);
};
