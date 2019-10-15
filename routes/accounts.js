const express = require("express");
const router = express.Router();
const { Account, validate } = require("../models/account");
const { validate: validateRewards } = require("../models/reward");
const { validate: validateRedeems } = require("../models/redeem");
var ObjectId = require("mongoose").Types.ObjectId;
const auth = require("../middleware/auth");

//Get Account by ID
router.get("/:id", auth, async (req, res) => {
  try {
    let account = await Account.findById({
      _id: new ObjectId(req.params.id)
    });
    if (!account) return res.status(404).send("Account not found");

    res.send(account);
  } catch (error) {
    console.log("error", error);
  }
});

//Get Boxes by ID
router.get("/boxes/:id", auth, async (req, res) => {
  try {
    let account = await Account.findOne({
      _id: new ObjectId(req.params.id)
    });
    res.send(account.boxes);
  } catch (error) {
    console.log("error", error);
  }
});

//POSTS
router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  //If invalid, return 400 - Bad request
  if (error) return res.status(400).send(error.details[0].message);

  account = new Account({
    userid: req.body.userid,
    fullname: req.body.fullname,
    rewards: [],
    redeems: [],
    boxes: []
  });

  try {
    account = await account.save();
    res.send(account);
  } catch (error) {
    console.log(error);
    res.status(404).send(error.message);
  }
});

//Refresh Account
router.post("/refresh/:id", auth, async (req, res) => {
  try {
    account = await Account.findOneAndUpdate(
      { _id: req.params.id },
      { rewards: [], redeems: [], boxes: [] },
      { new: true }
    );

    //If invalid, return 400 - Bad request
    if (!account) return res.status(400).send("Account does not exist");

    res.send(account.rewards);
  } catch (error) {
    console.log(error);
    res.status(404).send(error.message);
  }
});

//Put New Reward
router.put("/rewards/:id", auth, async (req, res) => {
  let { error } = validateRewards(req.body);

  //If invalid, return 400 - Bad request
  if (error) return res.status(400).send(error.details[0].message);

  const reward = req.body;

  try {
    account = await Account.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { rewards: reward } },
      { new: true }
    );

    //If invalid, return 400 - Bad request
    if (!account) return res.status(400).send("Account does not exist");

    res.send(account.rewards);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

//Put New Redeem
router.put("/redeems/:id", auth, async (req, res) => {
  let { error } = validateRedeems(req.body);

  //If invalid, return 400 - Bad request
  if (error) return res.status(400).send(error.details[0].message);

  const redeem = req.body;

  try {
    account = await Account.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { redeems: redeem } },
      { new: true }
    );

    //If invalid, return 400 - Bad request
    if (!account) return res.status(400).send("Account does not exist");

    res.send(account.redeems);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

//Update Boxes
router.put("/boxes/:id", auth, async (req, res) => {
  //If invalid, return 400 - Bad request
  if (!Array.isArray(req.body))
    return res.status(400).send("Boxes must be an array");

  const boxes = req.body;

  try {
    account = await Account.findOneAndUpdate(
      { _id: req.params.id },
      { boxes: boxes },
      { new: true }
    );

    //If invalid, return 400 - Bad request
    if (!account) return res.status(400).send("Account does not exist");

    res.send(account.boxes);
  } catch (error) {
    console.log(error);
    res.status(404).send(error.message);
  }
});

//GET ALL
router.get("/jah444gfsgdas153fasd", async (req, res) => {
  const Accounts = await Account.find();
  res.send(Accounts);
});
module.exports = router;
