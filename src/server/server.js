require("dotenv").config();
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const AzureStrategy = require("passport-azure-ad").OIDCStrategy;
const https = require("https");
const fs = require("fs");

const app = express();

app.use(bodyParser.json());
app.use(
  session({
    secret: "Cg10BwFzX2um",
    resave: false,
    saveUninitialized: false,
  })
);
passport.use(
  new LocalStrategy((username, password, done) => {
    if (username === "admin" && password === "secret") {
      return done(null, { username, is_admin: true });
    } else {
      return done(null, false, { message: "Invalid username/password" });
    }
  })
);
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/oauth2callback",
    },
    (accessToken, refreshToken, profile, done) =>
      done(null, profile.displayName)
  )
);
passport.use(
  new AzureStrategy(
    {
      clientID: process.env.MICROSOFT_CLIENT_ID,
      clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
      redirectUrl: "https://localhost:3000/oauth2callback",
      responseType: "code",
      responseMode: "query",
      identityMetadata:
        "https://login.microsoftonline.com/common/.well-known/openid-configuration",
      validateIssuer: false,
    },
    (accessToken, refreshToken, profile, done) => done(null, profile.upn)
  )
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((id, done) => done(null, id));
app.use(passport.initialize());
app.use(passport.session());

app.get("/api/profile", (req, res) => {
  if (!req.user) {
    return res.status(401).send();
  }
  res.json(req.user);
});

app.get(
  "/login",
  passport.authenticate("azuread-openidconnect", { scope: ["profile"] })
);

app.get(
  "/oauth2callback",
  passport.authenticate("azuread-openidconnect"),
  (req, res) => {
    res.redirect("/");
  }
);

app.post("/api/login", passport.authenticate("local"), (req, res) => {
  res.send();
});

app.use(express.static(path.resolve(__dirname, "..", "..", "dist")));
app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api")) {
    res.sendFile(path.resolve(__dirname, "..", "..", "dist", "index.html"));
  } else {
    next();
  }
});

const server = https
  .createServer(
    {
      key: fs.readFileSync("server.key"),
      cert: fs.readFileSync("server.crt"),
    },
    app
  )
  .listen(3000, () => {
    console.log(`started on https://localhost:${server.address().port}`);
  });
