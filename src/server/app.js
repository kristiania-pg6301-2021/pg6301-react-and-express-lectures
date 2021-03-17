/* eslint-disable */
require("dotenv").config();
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const AzureStrategy = require("passport-azure-ad").OIDCStrategy;

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
    new AzureStrategy(
      {
        clientID: process.env.MICROSOFT_CLIENT_ID,
        clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
        responseType: "code",
        responseMode: "query",
        validateIssuer: false,
        redirectUrl: "https://webapps.kristiania.no:3000/oauth2callback",
        identityMetadata: "https://login.microsoftonline.com/common/.well-known/openid-configuration"
      },
      function (accessToken, refreshToken, profile, cb) {
        cb(null, profile.upn || profile.displayName);
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

  app.get("/login", passport.authenticate("azuread-openidconnect", { scope: ["profile", "email"] }));

  app.get(
    "/oauth2callback",
    passport.authenticate("azuread-openidconnect"),
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
