const { User } = require("../models/user_model");
const { signUpValidation, loginValidation } = require("../utils/validation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signUp = async (req, res) => {
  try {
    let user;
    signUpValidation(req?.body);
    const { firstName, lastName, email, password, gender, age, about } =
      req.body;
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
      gender,
      age,
      password: hashPassword,
      about,
    });

    await user.save();

    res.status(201).json({
      message: "user created successfully",
    });
  } catch (error) {
    console.log("Error in signUp api", error);
    res.status(400).json({
      message: error?.message || "something went wrong",
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    loginValidation(req.body);
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }
    const isValidPassword = await bcrypt.compare(password, user?.password);
    if (!isValidPassword) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }
    const token = await jwt.sign(
      { _id: user?._id },
      process.env.JWT_SECRET_KEY
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    });
    user = {
      _id: user?._id,
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      profilePicUrl: user?.profilePicUrl,
      about: user?.about,
      age: user?.age,
      gender: user?.gender,
    };
    res.status(200).json({ message: "login successfully", data: user });
  } catch (error) {
    console.log("Error in login api", error);
    res.status(400).json({
      message: error?.message || "something went wrong",
    });
  }
};

const logout = async (req, res) => {
  try {
    res.cookie("token", null, {
      httpOnly: true,
      expires: new Date(Date.now()),
      sameSite: "none",
      secure: true,
    });
    res.status(200).json({
      message: "Logout successfully",
    });
  } catch (error) {
    console.log("Error in logout api", error);
    res.status(400).json({
      message: error?.message || "something went wrong",
    });
  }
};

module.exports = { signUp, login, logout };
