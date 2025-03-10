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
      validate(value) {
        if (!validator.isInt(value.toString())) {
          throw new Error("Age should be a number");
        }
      },
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female", "other"],
      validate(value) {
        if (!validator.isAlpha(value)) {
          throw new Error("Gender should contain only alphabets");
        }
        if (!["male", "female", "other"].includes(value)) {
          throw new Error("Gender should be male, female, or other");
        }
      },
    },
    profilePicUrl: {
      type: String,
      trim: true,
      default: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
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
