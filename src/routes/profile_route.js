const express = require("express");
const { authMiddleware } = require("../middleware/auth_middleware");
const {
  getProfile,
  updateProfile,
} = require("../controllers/profile_controller");

const profileRouter = express.Router();

profileRouter.get("/get-profile", authMiddleware, getProfile);
profileRouter.patch("/update-profile", authMiddleware, updateProfile);
module.exports = {
  profileRouter,
};
