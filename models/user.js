const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  fullname: { type: String, required: true },
  loginmethod: { type: String, required: true },
  accountid: { type: String }
});

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  schema = Joi.object().keys({
    email: Joi.string()
      .email()
      .required()
      .error(() => {
        return {
          message: `Email is invalid`
        };
      }),
    password: Joi.string()
      .min(6)
      .required()
      .error(errors => {
        errors.forEach(err => {
          switch (err.type) {
            case "any.empty":
              err.message = "Password can't be blank";
              break;
            case "string.min":
              err.message = `Password is too short (Minimum is ${err.context.limit} characters)`;
              break;
            default:
              break;
          }
        });
        return errors;
      }),

    fullname: Joi.string()
      .required()
      .error(() => {
        return {
          message: `Name can't be blank`
        };
      }),

    loginmethod: Joi.string().required(),
    accountid: Joi.string().optional()
  });
  return Joi.validate(user, schema);
}

exports.validate = validateUser;
exports.User = User;
