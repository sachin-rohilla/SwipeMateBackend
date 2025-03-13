const express = require("express");
const { connectToDB } = require("./config/db");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const { authRouter } = require("./routes/auth_route");
const { profileRouter } = require("./routes/profile_route");
const { connectionRequestRouter } = require("./routes/connectionRequest_route");
const { userRouter } = require("./routes/user_route");
const app = express();
const port = 3000;

dotenv.config();
app.use(cookieParser());
app.use(express.json());

app.use("/api", authRouter);
app.use("/api", profileRouter);
app.use("/api", connectionRequestRouter);
app.use("/api", userRouter);

connectToDB()
  .then(() => {
    app.listen(port, () => console.log("server started"));
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error?.message);
  });
