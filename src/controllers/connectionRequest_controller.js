const { ConnectionRequestModel } = require("../models/connectionRequest_model");
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

    const existingRequest = await ConnectionRequestModel.findOne({
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

    const request = new ConnectionRequestModel({
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

module.exports = {
  connectionSent,
};
