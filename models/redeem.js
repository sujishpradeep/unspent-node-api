const mongoose = require("mongoose");
const Joi = require("joi");

const redeemSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  box: { type: String, required: true },
  date: { type: Date, required: true },
  notes: String,
  timestamp: { type: Date, default: Date.now }
});

const Redeem = mongoose.model("Redeem", redeemSchema);

function validateRedeem(redeem) {
  schema = {
    box: Joi.string().required(),
    amount: Joi.number()
      .required()
      .min(0),
    date: Joi.string().required(),
    notes: Joi.optional(),
    timestamp: Joi.optional()
  };

  return Joi.validate(redeem, schema);
}

exports.validate = validateRedeem;
exports.Redeem = Redeem;
exports.redeemSchema = redeemSchema;
