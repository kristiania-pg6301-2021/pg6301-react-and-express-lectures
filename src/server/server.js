const express = require("express");
const path = require("path");
const https = require("https");
const fs = require("fs");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());

app.get("/api/profile", (req, res) => {
  let username = req.cookies.username; // = "Johannes fra serveren";
  if (!username) {
    return res.status(401).send();
  }
  res.json({ username });
});

app.post("/api/login", (req, res) => {
  const { username } = req.body;
  res.cookie("username", username);
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
