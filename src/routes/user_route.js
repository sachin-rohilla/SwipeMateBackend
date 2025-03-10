const express = require("express");
const { signUp } = require("../controllers/auth_controller");

const authRouter = express.Router();

authRouter.post("/signup", signUp);

module.exports = { authRouter };
