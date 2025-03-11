const validator = require("validator");
const signUpValidation = (data) => {
  const { firstName, lastName, email, password } = data;
  if (!firstName) {
    throw new Error("firstName is required");
  }
  if (!email) {
    throw new Error("email is required");
  }
  if (!password) {
    throw new Error("password is required");
  }
  if (firstName?.length < 3 || firstName?.length > 20) {
    throw new Error("firstName length should be between 3 and 20");
  }
  if (lastName?.length < 3 || lastName?.length > 20) {
    throw new Error("lastName length should be between 3 and 20");
  }
  if (!validator.isAlpha(firstName)) {
    throw new Error("firstName is not valid");
  }
  if (!validator.isEmail(email)) {
    throw new Error("email is not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error("password is not strong enough");
  }
};

module.exports = { signUpValidation };
