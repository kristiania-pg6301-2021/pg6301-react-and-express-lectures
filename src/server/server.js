const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");

const app = express();

app.use(bodyParser.json());
app.use(
  session({
    secret: "Cg10BwFzX2um",
    resave: false,
    saveUninitialized: false,
  })
);

app.get("/api/profile", (req, res) => {
  const { username } = req.session;
  if (!username) {
    return res.status(401).send();
  }
  res.json({ username });
});

app.post("/api/login", (req, res) => {
  const { username } = req.body;
  req.session.username = username;
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
