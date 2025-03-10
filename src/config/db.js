const mongoose = require("mongoose");

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("connected to db successfully");
  } catch (error) {
    throw error;
  }
};

module.exports = { connectToDB };
