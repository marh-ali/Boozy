const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Business = require("../models/Business");
const ensureAuthenticated = require("../middleware/ensureAuthenticated");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

// Sign up route
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

// Log in route
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

    res.status(200).json({ accessToken: token, displayName: user.displayName }); // Move this line inside the try block
  } catch (error) {
    res.status(500).json({ message: "Error logging in" });
  }
});

module.exports = router;
