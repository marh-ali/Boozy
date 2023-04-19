require("dotenv").config();
const User = require("./models/User");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const apiRoutes = require("./routes/api");
const app = express();
const router = express.Router();

app.use(express.json()); // Body parser
app.use(cors()); // Enable CORS

app.use("/api", apiRoutes);

// Passport.js middleware
app.use(passport.initialize());

// Passport.js strategies and configuration
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// Google OAuth2 Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await User.findOne({
          oauthId: profile.id,
          provider: "google",
        });

        if (existingUser) {
          return done(null, existingUser);
        }

        const newUser = await new User({
          oauthId: profile.id,
          provider: "google",
          email: profile.emails[0].value,
          displayName: profile.displayName,
          picture: profile.photos[0].value,
        }).save();

        done(null, newUser);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

// Google OAuth2 routes
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    // Handle successful authentication, redirect to the desired page
    res.redirect("/dashboard");
  }
);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");

  module.exports = router;
});
