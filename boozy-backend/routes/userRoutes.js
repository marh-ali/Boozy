const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Create a new user
router.post("/users/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({
      email,
      password,
      displayName: email.split("@")[0],
      provider: "local",
    });

    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error creating user" });
  }
});

// A post route for authentication, etc.
router.post("/users/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      accessToken: token,
      userId: user._id,
      displayName: user.displayName,
      email: user.email,
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in" });
  }
});

//Update user profile
router.put("/users/update", async (req, res) => {
  try {
    const { id, newName, newEmail } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { displayName: newName, email: newEmail },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Error updating user" });
  }
});

// FAVORITE SPOT ROUTES

// GET user's favorite businesses
router.get("/favorites", ensureAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("favoriteSpots");
    res.status(200).json(user.favoriteSpots);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user favorites" });
  }
});

// ADD a business to user's favorite list
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

// REMOVE a business from user's favorite list
router.delete(
  "/favorites/:businessId",
  ensureAuthenticated,
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      user.favorites.pull(req.params.businessId);
      await user.save();

      res.status(200).json(user.favorites);
    } catch (error) {
      res.status(500).json({ message: "Error removing favorite" });
    }
  }
);

module.exports = router;
