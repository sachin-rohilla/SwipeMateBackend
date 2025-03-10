const express = require("express");
const { connectToDB } = require("./config/db");
const dotenv = require("dotenv");
const { authRouter } = require("./routes/user_route");
const app = express();
const port = 3000;

dotenv.config();
app.use(express.json());

app.use("/api", authRouter);

connectToDB()
  .then(() => {
    app.listen(port, () => console.log("server started"));
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error?.message);
  });
