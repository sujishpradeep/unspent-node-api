const mongoose = require("mongoose");
const Joi = require("joi");

const rewardSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  date: { type: Date, required: true },
  notes: String,
  timestamp: { type: Date, default: Date.now }
});

const Reward = mongoose.model("Reward", rewardSchema);

function validateReward(reward) {
  schema = {
    category: Joi.string().required(),
    amount: Joi.number()
      .required()
      .min(0),
    date: Joi.string().required(),
    notes: Joi.optional(),
    timestamp: Joi.optional()
  };

  return Joi.validate(reward, schema);
}

exports.validate = validateReward;
exports.Reward = Reward;
exports.rewardSchema = rewardSchema;
