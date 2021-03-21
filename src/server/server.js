require("dotenv").config();
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;

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
    (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      done(null, profile.displayName);
    }
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

app.get("/login", passport.authenticate("google", { scope: ["profile"] }));

app.get("/oauth2callback", passport.authenticate("google"), (req, res) => {
  res.redirect("/");
});

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

const server = app.listen(3000, () => {
  console.log(`started on http://localhost:${server.address().port}`);
});
