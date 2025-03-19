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

    const user = await User.findOne(_id).select(
      "-password -__v -createdAt -updatedAt"
    );
    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "Profile fetched successfully",
      data: user,
    });
  } catch (error) {
    console.log("Error in getProfile API", error);
    res.status(400).json({
      message: error?.message || "Something went wrong",
    });
  }
};
const updateProfile = async (req, res) => {
  try {
    const { _id } = req?.user;

    if (!_id) {
      return res.status(400).json({
        message: "Something went wrong",
      });
    }

    const { firstName, lastName, age, gender, profilePicUrl } = req.body;

    let updateData = {
      firstName: firstName || req?.user?.firstName,
      lastName: lastName || req?.user?.lastName,
      age: age || req?.user.age,
      gender: gender || req?.user.gender,
      profilePicUrl: profilePicUrl || req?.user?.profilePicUrl,
    };

    profileValidation(req.body);

    const user = await User.findByIdAndUpdate(_id, updateData, {
      new: true,
    }).select("-password -__v -createdAt -updatedAt");

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    console.log("Error in updateProfile API", error);
    res.status(400).json({
      message: error?.message || "Something went wrong",
    });
  }
};

module.exports = { getProfile, updateProfile };
