const { ConnectionRequest } = require("../models/connectionRequest_model");

const getRecievedRequest = async (req, res) => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      return res.status(400).json({
        message: "Something went wrong",
      });
    }

    const data = await ConnectionRequest.find({
      toUserId: userId,
      status: "interested",
    })
      .populate("fromUserId", [
        "firstName",
        "lastName",
        "profilePicUrl",
        "age",
        "gender",
        "about",
      ])
      .select("fromUserId");
    res.status(200).json({
      message: "Data fetched successfully",
      data: data,
    });
  } catch (error) {
    console.log("Error in getRecievedRequest api", error);
    res.status(400).json({
      message: error?.message || "Something went wrong",
    });
  }
};

const getAcceptedRequest = async (req, res) => {
  try {
    const connectionRequets = await ConnectionRequest.find({
      $or: [
        {
          fromUserId: req.user?._id,
          status: "accepted",
        },
        {
          toUserId: req.user?._id,
          status: "accepted",
        },
      ],
    })
      .populate("fromUserId", ["firstName", "lastName", "profilePicUrl"])
      .populate("toUserId", [
        "firstName",
        "lastName",
        "profilePicUrl",
        "about",
        "age",
        "gender",
      ]);
    const data = connectionRequets.map((item) => {
      if (item.fromUserId?._id.toString() === req.user?._id.toString()) {
        return item?.toUserId;
      } else {
        return item?.fromUserId;
      }
    });

    res.status(200).json({
      message: "Connection requests fetched successfully",
      data: data,
    });
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong while getting user " + error?.message,
    });
  }
};
module.exports = { getRecievedRequest, getAcceptedRequest };
