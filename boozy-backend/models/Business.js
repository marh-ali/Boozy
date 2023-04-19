const mongoose = require("mongoose");

const BusinessSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    location: {
      address: String,
      city: String,
      state: String,
      country: String,
      postalCode: String,
      coordinates: {
        type: [Number],
        index: "2dsphere",
      },
    },
    happyHour: {
      offersFood: Boolean,
      offersDrinks: Boolean,
      times: [
        {
          dayOfWeek: String,
          start: String,
          end: String,
        },
      ],
      menu: String,
    },
  },
  {
    timestamps: true,
  }
);

const Business = mongoose.model("Business", BusinessSchema);

module.exports = Business;
