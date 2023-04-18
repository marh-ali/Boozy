const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;

const app = express();

app.use(express.json()); // Body parser
app.use(cors()); // Enable CORS

// Passport.js middleware
app.use(passport.initialize());

// Passport.js strategies and configuration will be added later

// API routes will be added later

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
