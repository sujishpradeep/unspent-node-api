const express = require("express");
const router = express.Router();
const Joi = require("joi");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const https = require("https");
const { User, validate } = require("../models/user");
const { Account } = require("../models/account");
const bcrypt = require("bcrypt");

//GET USER BY ID
router.get("/:id", async (req, res) => {
  try {
    let user = await User.findOne({ email: req.params.id });
    if (!user)
      return res
        .status(404)
        .send("The user with ID " + req.params.id + " is not found");
    res.send(user);
  } catch (error) {
    res.send(error.message);
  }
});

//SIGNUP - ADD NEW USER AND GENERATE SEND TOKEN
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  //If invalid, return 400 - Bad request
  if (error) return res.status(400).send(error.details[0].message);

  try {
    let user = await User.findOne({ email: req.body.email });

    if (user)
      return res
        .status(400)
        .send(
          "User with this Email ID has already signed up. Please login and continue"
        );

    account = new Account({
      fullname: req.body.fullname,
      userid: req.body.email,
      rewards: [],
      redeems: [],
      boxes: []
    });
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(req.body.password, salt);

    account = await account.save();
    user = new User({
      email: req.body.email,
      fullname: req.body.fullname,
      password: hashed,
      loginmethod: req.body.loginmethod,
      accountid: account._id
    });
    user = await user.save();

    const token = generateAuthToken(user);

    res
      .header("x-auth-token", token)
      .header("access-control-expose-headers", "x-auth-token")
      .send(_.pick(user, ["email", "fullname", "loginmethod", "accountid"]));
  } catch (error) {
    console.log(error.message);
    res.status(404).send(error.message);
  }
});

//LOGIN - VERIFY USER NAME AND PASSWORD AND POST TOKEN
router.post("/auth/", async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("INVALID USER/PASSWORD");

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) return res.status(400).send("INVALID USER/PASSWORD");

    const token = generateAuthToken(user);
    res.send(token);
  } catch (error) {
    console.log("error", error);
  }
});

//LOGIN - VERIFY USER NAME AND PASSWORD AND POST TOKEN
router.post("/authgoogle/", async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      account = new Account({
        fullname: req.body.fullname,
        userid: req.body.email,
        rewards: [],
        redeems: [],
        boxes: []
      });
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);

      account = await account.save();
      user = new User({
        email: req.body.email,
        fullname: req.body.fullname,
        password: hashed,
        loginmethod: req.body.loginmethod,
        accountid: account._id
      });
      user = await user.save();

      const token = generateAuthToken(user);

      return res
        .header("x-auth-token", token)
        .header("access-control-expose-headers", "x-auth-token")
        .send(_.pick(user, ["email", "fullname", "loginmethod", "accountid"]));
    }

    const url = `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${req.body.password}`;

    await https
      .get(url, resp => {
        let data = "";

        // A chunk of data has been recieved.
        resp.on("data", chunk => {
          data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on("end", () => {
          const token = generateAuthToken(user);

          return res
            .header("x-auth-token", token)
            .header("access-control-expose-headers", "x-auth-token")
            .send(
              _.pick(user, ["email", "fullname", "loginmethod", "accountid"])
            );
        });
      })
      .on("error", err => {
        return res.status(400).send("Access Denied! Invalid login credentials");
      });
  } catch (error) {
    console.log("error", error);
  }
});

generateAuthToken = function(user) {
  const token = jwt.sign(
    {
      email: user.email,
      fullname: user.fullname,
      loginmethod: user.loginmethod,
      accountid: user.accountid
    },
    "unspent_jwtPrivateKey"
  );
  return token;
};
module.exports = router;
