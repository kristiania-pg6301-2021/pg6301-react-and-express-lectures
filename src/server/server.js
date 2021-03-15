/* eslint-disable */
const path = require("path");
const express = require("express");

const app = express();

app.get("/api/account", (req, res) => {
  if (!req.user) {
    return res.status(401).send();
  }
  
  res.json({ account: { balance: 240 } });
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
