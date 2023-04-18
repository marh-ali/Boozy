const express = require("express");
const router = express.Router();
const User = require("../models/User");
const HappyHourSpot = require("../models/HappyHourSpot");
const Business = require("../models/Business");
const ensureAuthenticated = require("../middleware/ensureAuthenticated");

// Happy hour spots routes
router.get("/spots", async (req, res) => {
  try {
    const spots = await HappyHourSpot.find();
    res.status(200).json(spots);
  } catch (error) {
    res.status(500).json({ message: "Error fetching spots" });
  }
});

router.post("/spots", async (req, res) => {
  try {
    const newSpot = new HappyHourSpot(req.body);
    await newSpot.save();
    res.status(201).json(newSpot);
  } catch (error) {
    res.status(500).json({ message: "Error creating spot" });
  }
});

router.put("/spots/:id", async (req, res) => {
  try {
    const updatedSpot = await HappyHourSpot.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedSpot);
  } catch (error) {
    res.status(500).json({ message: "Error updating spot" });
  }
});

router.delete("/spots/:id", async (req, res) => {
  try {
    await HappyHourSpot.findByIdAndRemove(req.params.id);
    res.status(200).json({ message: "Spot deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting spot" });
  }
});

// Business accounts routes
router.get("/businesses", async (req, res) => {
  try {
    const businesses = await Business.find();
    res.status(200).json(businesses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching businesses" });
  }
});

router.post("/businesses", async (req, res) => {
  try {
    const newBusiness = new Business(req.body);
    await newBusiness.save();
    res.status(201).json(newBusiness);
  } catch (error) {
    res.status(500).json({ message: "Error creating business" });
  }
});

router.put("/businesses/:id", async (req, res) => {
  try {
    const updatedBusiness = await Business.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedBusiness);
  } catch (error) {
    res.status(500).json({ message: "Error updating business" });
  }
});

router.delete("/businesses/:id", async (req, res) => {
  try {
    await Business.findByIdAndRemove(req.params.id);
    res.status(200).json({ message: "Business deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting business" });
  }
});

// User favorites routes
router.get("/favorites", ensureAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("favorites");
    res.status(200).json(user.favorites);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user favorites" });
  }
});

router.post("/favorites/:spotId", ensureAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const spot = await HappyHourSpot.findById(req.params.spotId);

    if (!spot) {
      return res.status(404).json({ message: "Spot not found" });
    }

    user.favorites.addToSet(spot._id);
    await user.save();

    res.status(201).json(user.favorites);
  } catch (error) {
    res.status(500).json({ message: "Error adding favorite" });
  }
});

router.delete("/favorites/:spotId", ensureAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.favorites.pull(req.params.spotId);
    await user.save();

    res.status(200).json({ message: "Favorite removed" });
  } catch (error) {
    res.status(500).json({ message: "Error removing favorite" });
  }
});

module.exports = router;
