/* eslint-disable */
require("dotenv").config();
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

function createApp() {
  const app = express();

  app.use(bodyParser.json());
  app.use(
    session({
      secret: "a secret used to encrypt the session cookies",
      resave: true,
      saveUninitialized: false,
    })
  );

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "https://webapps.kristiania.no:3000/oauth2callback",
      },
      function (accessToken, refreshToken, profile, cb) {
        cb(null, profile.displayName);
      }
    )
  );


  app.use(passport.initialize());
  app.use(passport.session());
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((id, done) => {
    done(null, id);
  });

  app.get("/api/account", (req, res) => {
    const { user } = req;
    if (!user) {
      return res.status(401).send();
    }
    res.json({ user, account: { balance: 240 } });
  });

  app.get("/login", passport.authenticate("google", { scope: ["profile"] }));

  app.get(
    "/oauth2callback",
    passport.authenticate("google", { failureRedirect: "/login" }),
    function (req, res) {
      // Successful authentication, redirect home.
      res.redirect("/");
    }
  );

  app.use(express.static(path.resolve(__dirname, "..", "..", "dist")));

  app.use((req, res, next) => {
    if (req.method === "GET" && !req.path.startsWith("/api")) {
      res.sendFile(path.resolve(__dirname, "..", "..", "dist", "index.html"));
    } else {
      next();
    }
  });
  return app;
}

module.exports = {
  createApp,
};
