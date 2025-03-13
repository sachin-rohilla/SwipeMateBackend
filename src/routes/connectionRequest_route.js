const express = require("express");
const { authMiddleware } = require("../middleware/auth_middleware");
const {
  connectionSent,
} = require("../controllers/connectionRequest_controller");

const connectionRequestRouter = express.Router();

connectionRequestRouter.post(
  "/send/request/:status/:toUserId",
  authMiddleware,
  connectionSent
);
module.exports = { connectionRequestRouter };
