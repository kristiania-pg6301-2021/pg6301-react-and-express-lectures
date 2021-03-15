/* eslint-disable */
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const app = express();

app.use(bodyParser.json());
app.use(
    session({
        secret: "a secret used to encrypt the session cookies",
    })
);

passport.use(
  new LocalStrategy((username, password, done) => {
    console.log({ username, password });
    if (username === "admin" && password === "secret") {
      return done(null, username);
    } else {
      return done(null, false, { message: "Invalid username/password" });
    }
  })
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

app.post("/api/login", passport.authenticate("local"), (req, res) => {
  res.status(200).send();
});

app.use(express.static(path.resolve(__dirname, "..", "..", "dist")));

app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api")) {
    res.sendFile(path.resolve(__dirname, "..", "..", "dist", "index.html"));
  } else {
    next();
  }
});

app.listen(3000, () => {
  console.log("App started");
});
