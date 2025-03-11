const { User } = require("../models/user_model");
const { signUpValidation } = require("../utils/validation");
const bcrypt = require("bcrypt");

const signUp = async (req, res) => {
  try {
    let user;
    signUpValidation(req?.body);
    const { firstName, lastName, email, password } = req.body;
    user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "user already exists",
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);

    user = new User({
      firstName,
      lastName,
      email,
      password: hashPassword,
    });

    await user.save();

    res.status(201).json({
      message: "user created successfully",
    });
  } catch (error) {
    console.log("Error in signUp api", error);
    res.status(400).json({
      message: error?.message,
    });
  }
};

module.exports = { signUp };
