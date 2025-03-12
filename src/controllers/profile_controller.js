const { User } = require("../models/user_model");
const { profileValidation } = require("../utils/validation");

const getProfile = async (req, res) => {
  try {
    const { _id } = req?.user;

    if (!_id) {
      return res.status(400).json({
        message: "Something went wrong",
      });
    }

    const user = await User.findOne(_id);
    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "Profile fetched successfully",
      user,
    });
  } catch (error) {
    console.log("Error in getProfile API", error);
    res.status(400).json({
      message: error?.message || "Something went wrong",
    });
  }
};

module.exports = { getProfile };
