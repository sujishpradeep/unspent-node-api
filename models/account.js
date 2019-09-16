const mongoose = require("mongoose");
const Joi = require("joi");
const { rewardSchema } = require("./reward");
const { redeemSchema } = require("./redeem");

const accountSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  userid: { type: String, required: true },
  boxes: [String],
  rewards: [rewardSchema],
  redeems: [redeemSchema]
});

const Account = mongoose.model("account", accountSchema);

function validateAccount(account) {
  schema = {
    userid: Joi.string().required(),
    fullname: Joi.string().required(),
    rewards: Joi.array().optional(),
    redeems: Joi.array().optional(),
    boxes: Joi.array().optional()
  };

  return Joi.validate(account, schema);
}

exports.validate = validateAccount;

exports.Account = Account;
