const express = require("express");
const { signUp, login } = require("../controllers/auth_controller");

const authRouter = express.Router();

authRouter.post("/signup", signUp);
authRouter.post("/login", login);

module.exports = { authRouter };
