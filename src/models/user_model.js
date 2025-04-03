const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 20,
      validate(value) {
        if (!validator.isAlpha(value)) {
          throw new Error("First name should contain only alphabets");
        }
      },
    },
    lastName: {
      type: String,
      trim: true,
      minlength: 3,
      maxlength: 20,

      validate(value) {
        if (!validator.isAlpha(value)) {
          throw new Error("Last name should contain only alphabets");
        }
      },
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email");
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (
          !validator.isStrongPassword(value, {
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
      },
    },
    age: {
      type: Number,
      required: true,
      min: 10,
      max: 80,
    },
    gender: {
      type: String,
      trim: true,
      required: true,
      enum: ["male", "female", "other"],
    },
    about: {
      type: String,
      trim: true,
      required: true,
      maxlength: 100,
      validate(value) {
        if (value.length > 100) {
          throw new Error("About field should be no more than 100 characters.");
        }
      },
    },
    profilePicUrl: {
      type: String,
      trim: true,
      default: "https://avatar.iran.liara.run/public/boy?username=unknown",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid URL");
        }
      },
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
module.exports = { User };
