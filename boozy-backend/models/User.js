const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  oauthId: {
    type: String,
  },
  provider: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  displayName: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
  },
  favoriteSpots: [
    {
      businessId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Business",
      },
      name: {
        type: String,
      },
      happyHour: {
        menu: String,
        times: [
          {
            dayOfWeek: String,
            start: String,
            end: String,
          },
        ],
      },
    },
  ],
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model("User", UserSchema);
