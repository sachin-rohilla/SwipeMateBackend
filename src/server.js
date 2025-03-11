const express = require("express");
const { connectToDB } = require("./config/db");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const { authRouter } = require("./routes/auth_route");
const { authMiddleware } = require("./middleware/auth_middleware");
const app = express();
const port = 3000;

dotenv.config();
app.use(cookieParser());
app.use(express.json());

app.use("/api", authRouter);
app.use("/api/profile", authMiddleware, async (req, res) => {
  res.send("profile");
});

connectToDB()
  .then(() => {
    app.listen(port, () => console.log("server started"));
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error?.message);
  });
