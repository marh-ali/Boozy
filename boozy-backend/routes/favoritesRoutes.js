const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Business = require("../models/Business");
const ensureAuthenticated = require("../middleware/ensureAuthenticated");

// ...Favorites routes (GET, POST, DELETE)

module.exports = router;
