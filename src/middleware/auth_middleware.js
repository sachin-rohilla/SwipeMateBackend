const jwt = require("jsonwebtoken");
const { User } = require("../models/user_model");
const authMiddleware = async (req, res, next) => {
  try {
    const token = req?.cookies?.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const { _id } = decoded;
    const user = await User.findOne({ _id });
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("Error in auth middleware", error);
    res.status(400).json({ message: error?.message || "something went wrong" });
  }
};

module.exports = { authMiddleware };
