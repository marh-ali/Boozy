const mongoose = require("mongoose");

const HappyHourSpotSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  hours: {
    type: String,
    required: true,
  },
  menu: {
    type: String,
  },
  business: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Business",
    required: true,
  },
});

HappyHourSpotSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("HappyHourSpot", HappyHourSpotSchema);
