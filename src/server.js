const express = require("express");
const { connectToDB } = require("./config/db");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

const port = 3000;

connectToDB()
  .then(() => {
    app.listen(port, () => console.log("server started"));
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error?.message);
  });
