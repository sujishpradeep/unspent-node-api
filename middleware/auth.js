const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const decoded = jwt.verify(token, "unspent_jwtPrivateKey");
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
};

// try {
//   const decoded = jwt.verify(token, "unspent_jwtPrivateKey");
//   req.user = decoded;
//   next();
// } catch (ex) {
//   res.status(400).send("Invalid token.");
// }
// };

// const jwt = require("jsonwebtoken");
// const https = require("https");
// const { Account } = require("../models/account");

// module.exports = async function(req, res, next) {
//   let gtoken = req.header("x-auth-gtoken");

//   if (gtoken) {
//     gtoken = gtoken.slice(1, -1);

//     console.log("gtoken", gtoken);

//     const url = `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${gtoken}`;
//     console.log("url ", url);

//     await https
//       .get(url, resp => {
//         let data = "";

//         // A chunk of data has been recieved.
//         resp.on("data", chunk => {
//           data += chunk;
//           console.log("data chunk ", data);
//         });

//         // The whole response has been received. Print out the result.
//         resp.on("end", () => {
//           console.log("data end2", typeof data);
//           const JSON_data = JSON.parse(data);
//           console.log("data end3", JSON_data.email);
//           if (!JSON_data.email) {
//             console.log("access denied");
//             return res.status(401).send("Access denied. Invalid token.");
//           }
//         });

//         next();
//       })
//       .on("error", err => {
//         console.log("access denied");
//         return res.status(401).send("Access denied. Invalid token.");
//       });
//   }nod

// next();
