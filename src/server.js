const express = require("express");
const { connectToDB } = require("./config/db");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const { authRouter } = require("./routes/auth_route");
const { authMiddleware } = require("./middleware/auth_middleware");
const { profileRouter } = require("./routes/profile_route");
const app = express();
const port = 3000;

dotenv.config();
app.use(cookieParser());
app.use(express.json());

app.use("/api", authRouter);
app.use("/api", profileRouter);

connectToDB()
  .then(() => {
    app.listen(port, () => console.log("server started"));
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error?.message);
  });
