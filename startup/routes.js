const express = require("express");
const accounts = require("../routes/accounts");
const users = require("../routes/users");

const cors = require("cors");
const error = require("../middleware/error");
const path = require("path");

module.exports = function(app) {
  app.use(cors());
  app.use(express.json());
  app.use(express.static(path.join(__dirname, `client/build`)));
  app.use("/api/users", users);
  app.use("/api/accounts", accounts);
  app.use(error);
};
