const express = require("express");
const { authMiddleware } = require("../middleware/auth_middleware");
const { getFeeds } = require("../controllers/feed_controller");
const feedRoute = express.Router();

feedRoute.get("/feeds", authMiddleware, getFeeds);

module.exports = { feedRoute };
