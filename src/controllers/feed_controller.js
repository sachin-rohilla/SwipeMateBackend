const { ConnectionRequest } = require("../models/connectionRequest_model");
const { User } = require("../models/user_model");

const getFeeds = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const skip = limit * (page - 1);
    const connections = await ConnectionRequest.find({
      $or: [
        {
          fromUserId: req.user?._id,
        },
        {
          toUserId: req.user?._id,
        },
      ],
    }).select("fromUserId toUserId");

    const hideUsersFromFeed = new Set();
    connections.forEach((connection) => {
      hideUsersFromFeed.add(connection.fromUserId.toString());
      hideUsersFromFeed.add(connection.toUserId.toString());
    });
    const users = await User.find({
      $and: [
        {
          _id: {
            $nin: Array.from(hideUsersFromFeed),
          },
        },
        {
          _id: {
            $ne: req.user?._id,
          },
        },
      ],
    })
      .select("firstName lastName profilePicUrl")
      .skip(skip)
      .limit(limit);
    res.status(200).json({
      message: "Feeds fetched successfully",
      data: users,
    });
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong while getting feeds " + error?.message,
    });
  }
};

module.exports = {
  getFeeds,
};
