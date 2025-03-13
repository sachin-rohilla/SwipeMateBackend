const express = require("express");
const { authMiddleware } = require("../middleware/auth_middleware");
const {
  connectionSent,
  connectionReview,
} = require("../controllers/connectionRequest_controller");

const connectionRequestRouter = express.Router();

connectionRequestRouter.post(
  "/send/request/:status/:toUserId",
  authMiddleware,
  connectionSent
);
connectionRequestRouter.post(
  "/review/request/:status/:requestId",
  authMiddleware,
  connectionReview
);
module.exports = { connectionRequestRouter };
