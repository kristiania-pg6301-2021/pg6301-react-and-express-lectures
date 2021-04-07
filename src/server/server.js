const express = require("express");
const path = require("path");
const https = require("https");
const fs = require("fs");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const app = express();

app.use(
  session({
    secret: "32bJS7s5k5al",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(bodyParser.json());
app.use(cookieParser());

passport.use(
  new LocalStrategy((username, password, done) => {
    if (username === "johannes" && password === "123456") {
      done(null, { username, is_admin: true });
    } else {
      done(null, false, { message: "Invalid username/password" });
    }
  })
);
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((id, done) => done(null, id));
app.use(passport.initialize());
app.use(passport.session());

app.get("/api/profile", (req, res) => {
  if (!req.user) {
    return res.status(401).send();
  }
  const { username } = req.user;
  res.json({ username });
});

app.post("/api/login", passport.authenticate("local"), (req, res) => {
  res.end();
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
    console.log(`server started on http://localhost:${server.address().port}`);
  });
