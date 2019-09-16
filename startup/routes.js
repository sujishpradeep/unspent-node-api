const express = require("express");
const accounts = require("../routes/accounts");
const users = require("../routes/users");
const rewards = require("../routes/rewards");
const cors = require("cors");
const error = require("../middleware/error");

module.exports = function(app) {
  app.use(cors());
  app.use(express.json());
  app.use("/api/users", users);
  app.use("/api/accounts", accounts);
  app.use("/api/rewards", rewards);
  app.use(error);
};
