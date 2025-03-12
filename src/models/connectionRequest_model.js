const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      enum: {
        values: ["accepted", "rejected", "ignored", "interested"],
        message: `{VALUE} incorrect status type`,
      },
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ConnectionRequestModel =
  mongoose.models.ConnectionRequestModel ||
  mongoose.model("ConnectionRequestModel", connectionRequestSchema);

module.exports = ConnectionRequestModel;
