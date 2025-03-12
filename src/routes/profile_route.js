const express = require("express");
const { authMiddleware } = require("../middleware/auth_middleware");
const { getProfile } = require("../controllers/profile_controller");

const profileRouter = express.Router();

profileRouter.get("/get-profile", authMiddleware, getProfile);
module.exports = {
  profileRouter,
};
