const express = require("express");
const { signUp, login, logout } = require("../controllers/auth_controller");

const authRouter = express.Router();

authRouter.post("/signup", signUp);
authRouter.post("/login", login);
authRouter.get("/logout", logout);

module.exports = { authRouter };
