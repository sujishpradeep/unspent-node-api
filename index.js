const express = require("express");
const app = express();
const winston = require("winston");

require("./startup/logging")();
require("./startup/db")();
require("./startup/routes")(app);

//PORT
const port = process.env.PORT || 3000;
//const port = 3000;
const server = app.listen(port, () =>
  winston.info(`listening to port ${port}`)
);

module.exports = server;
