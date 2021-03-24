const express = require("express");
const path = require("path");
const https = require("https");
const fs = require("fs");

const app = express();

console.log("Hello world");

app.get("/api/profile", (req, res) => {
  res.json({ username: "Johannes fra serveren" });
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
