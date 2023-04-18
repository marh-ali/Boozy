const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  oauthId: {
    type: String,
    required: true,
  },
  provider: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
  },
});

module.exports = mongoose.model("User", UserSchema);
