const express = require("express");
const { connectToDB } = require("./config/db");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const { authRouter } = require("./routes/auth_route");
const { profileRouter } = require("./routes/profile_route");
const { connectionRequestRouter } = require("./routes/connectionRequest_route");
const { userRouter } = require("./routes/user_route");
const { feedRoute } = require("./routes/feed_route");
const app = express();
const cors = require("cors");
const port = 3000;

dotenv.config();
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cookieParser());
app.use(express.json());
app.use(cors(corsOptions));

app.use("/api", authRouter);
app.use("/api", profileRouter);
app.use("/api", connectionRequestRouter);
app.use("/api", userRouter);
app.use("/api", feedRoute);

connectToDB()
  .then(() => {
    app.listen(port, () => console.log(`Server is running on port ${port}`));
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error?.message);
  });
