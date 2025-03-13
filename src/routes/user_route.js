const express = require("express");
const { authMiddleware } = require("../middleware/auth_middleware");
const {
  getRecievedRequest,
  getAcceptedRequest,
} = require("../controllers/user_controller");

const userRouter = express.Router();

userRouter.get("/request/received", authMiddleware, getRecievedRequest);
userRouter.get("/request/accepted", authMiddleware, getAcceptedRequest);

module.exports = { userRouter };
