const express = require("express");
const { authMiddleware } = require("../middleware/auth_middleware");
const { getRecievedRequest } = require("../controllers/user_controller");

const userRouter = express.Router();

userRouter.get("/request/received", authMiddleware, getRecievedRequest);
module.exports = { userRouter };
