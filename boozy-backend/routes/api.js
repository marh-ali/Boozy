const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Business = require("../models/Business");
const ensureAuthenticated = require("../middleware/ensureAuthenticated");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

app.use(express.json());

app.use("/api/businesses", businessRoutes);
app.use("/api/users", userRoutes);
app.use("/api/favorites", favoritesRoutes);

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
