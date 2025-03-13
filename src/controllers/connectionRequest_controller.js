const { default: mongoose } = require("mongoose");
const { ConnectionRequest } = require("../models/connectionRequest_model");
const { User } = require("../models/user_model");

const connectionSent = async (req, res) => {
  try {
    const fromUserId = req.user?._id;
    const toUserId = req.params?.toUserId;
    const status = req.params?.status;
    const allowedStatus = ["interested", "ignored"];

    if (!fromUserId || !toUserId || !status) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    if (!allowedStatus?.includes(status)) {
      return res.status(400).json({
        message: "Invalid status",
      });
    }

    if (fromUserId.equals(toUserId)) {
      return res.status(400).json({
        message: "You can't send a request to yourself",
      });
    }

    const toUserExists = await User.findById(toUserId);

    if (!toUserExists) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const existingRequest = await ConnectionRequest.findOne({
      $or: [
        {
          fromUserId,
          toUserId,
        },
        {
          fromUserId: toUserId,
          toUserId: fromUserId,
        },
      ],
    });

    if (existingRequest) {
      return res.status(400).json({
        message: "Connection request already sent",
      });
    }

    const request = new ConnectionRequest({
      fromUserId,
      toUserId,
      status,
    });

    const savedRequest = await request.save();

    res.status(200).json({
      message: "Connection request sent successfully",
      data: savedRequest,
    });
  } catch (error) {
    res.status(400).json({
      message:
        "Something went wrong while sending the connection request: " +
        error?.message,
    });
  }
};

const connectionReview = async (req, res) => {
  try {
    const requestId = req.params?.requestId;
    const status = req.params?.status;
    const validStatus = ["accepted", "rejected"];

    const connectionRequest = await ConnectionRequest.findOne({
      _id: requestId,
      toUserId: req.user?._id,
      status: "interested",
    });

    if (!validStatus.includes(status)) {
      return res.status(400).json({
        message: "Invalid status. Expected 'accepted' or 'rejected'.",
      });
    }

    const objectIdRequestId = new mongoose.Types.ObjectId(requestId);
    if (objectIdRequestId.equals(req.user?._id)) {
      return res.status(400).json({
        message: "You can't review your own request",
      });
    }

    if (!connectionRequest) {
      return res.status(400).json({
        message: "Connection request not found or invalid",
      });
    }

    connectionRequest.status = status;

    const updatedRequest = await connectionRequest.save();

    res.status(200).json({
      message: "Request reviewed successfully",
      data: updatedRequest,
    });
  } catch (error) {
    res.status(400).json({
      message:
        "Something went wrong while reviewing the connection request: " +
        error?.message,
    });
  }
};

module.exports = {
  connectionSent,
  connectionReview,
};
