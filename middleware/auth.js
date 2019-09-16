const jwt = require("jsonwebtoken");
const https = require("https");
const { Account } = require("../models/account");

module.exports = async function(req, res, next) {
  // let token = req.header("x-auth-token");

  // token = token.slice(1, -1);

  // const url = `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`;
  // console.log("url ", url);

  // await https
  //   .get(url, resp => {
  //     let data = "";

  //     // A chunk of data has been recieved.
  //     resp.on("data", chunk => {
  //       data += chunk;
  //       console.log("data chunk ", data);
  //     });

  //     // The whole response has been received. Print out the result.
  //     resp.on("end", () => {
  //       console.log("data end ", data);
  //       console.log(JSON.parse(data));
  //       req.user = JSON.parse(data).email;
  //       req.usertype = "google";
  //       next();
  //     });
  //   })
  //   .on("error", err => {
  //     return res.status(401).send("Access denied. Invalid token.");
  //   });

  next();
  // try {
  //   const decoded = jwt.verify(token, "vidly_jwtPrivateKey");
  //   req.user = decoded;
  //   next();
  // } catch (ex) {
  //   res.status(400).send("Invalid token.");
  // }
};
