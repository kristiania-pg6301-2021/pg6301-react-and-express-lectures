const express = require("express");
const path = require("path");

const app = express();

app.get("/api/profile", (req, res) => {
  if (!req.user) {
    return res.status(401).send();
  }
  res.json({ username: "Johannes" });
});

app.post("/api/login", (req, res) => {
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
