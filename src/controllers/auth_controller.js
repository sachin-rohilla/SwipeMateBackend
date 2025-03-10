const { User } = require("../models/user_model");

const signUp = async (req, res) => {
  try {
    console.log(req.body);
    let user;
    user = new User(req.body);
    await user.save();
    res.status(201).json({
      message: "user created successfully",
    });
  } catch (error) {
    console.log("Error in signup api", error);
    res.status(400).json({
      message: error?.message,
    });
  }
};

module.exports = { signUp };
