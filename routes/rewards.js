// const express = require("express");
// const router = express.Router();
// const { Reward, validate } = require("../models/reward");
// const { Account } = require("../models/account");

// //GET ALL BY Account ID
// router.get("/", async (req, res) => {
//   const Rewards = await Reward.find();
//   res.send(Rewards);
// });

// //POSTS
// router.post("/", async (req, res) => {
//   try {
//     //Validate input, return 400 - Bad request if error
//     const { error } = validate(req.body);
//     if (error) return res.status(400).send(error.details[0].message);

//     reward = new Reward({
//       amount: req.body.amount,
//       category: req.body.category,
//       date: req.body.date,
//       notes: req.body.notes
//     });
//     reward = await reward.save();
//     res.send(reward);
//   } catch (error) {
//     res.status(404).send(error.message);
//   }
// });

// //REMOVE
// router.delete("/:id", async (req, res) => {
//   try {
//     const reward = await Reward.findByIdAndRemove({ _id: req.params.id });
//     res.send(reward);
//   } catch (error) {
//     return res.status(404).send("ID not found");
//   }
// });

// module.exports = router;
