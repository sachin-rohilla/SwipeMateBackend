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

const loginValidation = (data) => {
  const { email, password } = data;
  if (!email) {
    throw new Error("email is required");
  }
  if (!password) {
    throw new Error("password is required");
  }

  if (!validator.isEmail(email)) {
    throw new Error("email is not valid");
  }
};

const profileValidation = (data) => {
  console.log(data, "data");
  const { firstName, lastName, age, gender, profilePicUrl } = data;

  if (firstName?.length < 3 || firstName?.length > 20) {
    throw new Error("First name length should be between 3 and 20 characters.");
  }
  if (firstName && !validator.isAlpha(firstName)) {
    throw new Error("First name should only contain alphabets.");
  }

  if (lastName?.length < 3 || lastName?.length > 20) {
    throw new Error("Last name length should be between 3 and 20 characters.");
  }
  if (lastName && !validator.isAlpha(lastName)) {
    throw new Error("Last name should only contain alphabets.");
  }

  if (age && !validator.isInt(age.toString(), { min: 1 })) {
    throw new Error("Age should be a valid number.");
  }

  if (gender && !["male", "female", "other"].includes(gender)) {
    throw new Error("Gender should be one of: male, female, or other.");
  }
  if (gender && !validator.isAlpha(gender)) {
    throw new Error("Gender should only contain alphabets.");
  }

  if (profilePicUrl && !validator.isURL(profilePicUrl)) {
    throw new Error("Profile picture URL is invalid.");
  }

  if (!profilePicUrl) {
    data.profilePicUrl =
      "https://cdn-icons-png.flaticon.com/512/149/149071.png";
  }
};
module.exports = { signUpValidation, loginValidation, profileValidation };
