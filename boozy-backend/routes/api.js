const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Business = require("../models/Business");
const ensureAuthenticated = require("../middleware/ensureAuthenticated");

// Business accounts routes

router.get("/businesses", async (req, res) => {
  try {
    const businesses = await Business.find({});
    res.status(200).json(businesses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching businesses" });
  }
});

router.get("/businesses/:id", async (req, res) => {
  try {
    const business = await Business.findById(req.params.id);
    if (business) {
      res.json(business);
    } else {
      res.status(404).json({ message: "Business not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/businesses", async (req, res) => {
  try {
    const newBusiness = new Business(req.body);
    await newBusiness.save();
    res.status(201).json(newBusiness);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating business", error: error.toString() });
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

router.post("/favorites/:businessId", ensureAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const business = await Business.findById(req.params.businessId);

    if (!business) {
      return res.status(404).json({ message: "Business not found" });
    }

    user.favorites.addToSet(business._id);
    await user.save();

    res.status(201).json(user.favorites);
  } catch (error) {
    res.status(500).json({ message: "Error adding favorite" });
  }
});

router.delete(
  "/favorites/:businessId",
  ensureAuthenticated,
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      user.favorites.pull(req.paramsbusinessId);
      await user.save();
    } catch (error) {
      res.status(500).json({ message: "Error removing favorite" });
    }
  }
);

module.exports = router;
