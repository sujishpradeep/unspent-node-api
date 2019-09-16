const mongoose = require("mongoose");
const config = require("config");
const db = config.get("db");
const winston = require("winston");

module.exports = function() {
  console.log(db);
  mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => winston.info(`Connected to ${db}..`));
  mongoose.set("useFindAndModify", false);
};

//.connect(db, { dbName: "trailo" }, { useNewUrlParser: true })
