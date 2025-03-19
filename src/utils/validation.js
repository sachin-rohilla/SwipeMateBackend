const validator = require("validator");

const signUpValidation = (data) => {
  const {
    firstName,
    lastName,
    email,
    password,
    age,
    gender,
    about,
    profilePicUrl,
  } = data;

  if (!firstName) {
    throw new Error("firstName is required");
  }
  if (firstName.length < 3 || firstName.length > 20) {
    throw new Error("firstName length should be between 3 and 20");
  }
  if (!validator.isAlpha(firstName)) {
    throw new Error("firstName should contain only alphabets");
  }

  if (lastName && (lastName.length < 3 || lastName.length > 20)) {
    throw new Error("lastName length should be between 3 and 20");
  }
  if (lastName && !validator.isAlpha(lastName)) {
    throw new Error("lastName should contain only alphabets");
  }

  if (!email) {
    throw new Error("email is required");
  }
  if (!validator.isEmail(email)) {
    throw new Error("Invalid email");
  }

  if (!password) {
    throw new Error("password is required");
  }
  if (
    !validator.isStrongPassword(password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
  ) {
    throw new Error(
      "Password should be strong with at least one lowercase, one uppercase, one number, and one symbol"
    );
  }

  if (age === undefined) {
    throw new Error("age is required");
  }
  if (age < 10 || age > 80) {
    throw new Error("Age should be between 10 and 80");
  }

  if (!gender) {
    throw new Error("gender is required");
  }
  if (!["male", "female", "other"].includes(gender)) {
    throw new Error("gender should be male, female, or other");
  }

  if (about) {
    if (about.length > 150) {
      throw new Error("About field should be no more than 150 characters.");
    }
  }

  if (profilePicUrl && !validator.isURL(profilePicUrl)) {
    throw new Error("Invalid profilePicUrl");
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
  const { firstName, lastName, age, gender, profilePicUrl, about } = data;

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

  if (age && (age < 10 || age > 80)) {
    throw new Error("Age should be between 10 and 80.");
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

  if (about && about.length > 150) {
    throw new Error("About field should be no more than 150 characters.");
  }
};

module.exports = { signUpValidation, loginValidation, profileValidation };
