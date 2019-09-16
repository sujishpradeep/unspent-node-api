const express = require("express");
const router = express.Router();
const Joi = require("joi");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
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

  console.log("req.body", req.body);
  console.log("error", error);
  //If invalid, return 400 - Bad request
  if (error) return res.status(400).send(error.details[0].message);

  try {
    let user = await User.findOne({ email: req.body.email });

    if (user)
      return res
        .status(400)
        .send("User with this Email ID has already signed up");

    account = new Account({
      fullname: req.body.fullname,
      userid: req.body.email
    });
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(req.body.password, salt);

    account = await account.save();

    user = new User({
      email: req.body.email,
      fullname: req.body.fullname,
      password: hashed,
      loginmethod: req.body.loginmethod
    });
    user = await user.save();

    const token = generateAuthToken(user);

    res
      .header("x-auth-token", token)
      .header("access-control-expose-headers", "x-auth-token")
      .send(_.pick(user, ["email", "fullname", "loginmethod"]));
  } catch (error) {
    console.log(error.message);
    res.status(404).send(error.message);
  }
});

//LOGIN - VERIFY USER NAME AND PASSWORD AND POST TOKEN
router.post("/auth/", async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    console.log("user", user);
    if (!user) return res.status(400).send("INVALID USER/PASSWORD");

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    console.log("validPassword", validPassword);
    if (!validPassword) return res.status(400).send("INVALID USER/PASSWORD");

    const token = generateAuthToken(user);
    res.send(token);
  } catch (error) {
    console.log("error", error);
  }
});

generateAuthToken = function(user) {
  const token = jwt.sign(
    {
      email: user.email,
      fullname: user.fullname,
      loginmethod: user.loginmethod
    },
    "unspent_jwtPrivateKey"
  );
  return token;
};
module.exports = router;
