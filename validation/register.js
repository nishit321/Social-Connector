const validator = require("validator");
import isEmpty from "./isEmpty";

module.exports = function validateRegisterInput(data) {
  let errors = {};
  if (!validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be betwween 2 and 30 characters";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
