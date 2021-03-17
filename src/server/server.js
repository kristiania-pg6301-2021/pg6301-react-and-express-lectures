const express = require("express");

const app = express();

app.get("/api/user", (req, res) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:1234");
  res.json({ username: "Johannes from server" });
});

const listener = app.listen(3000, () => {
  console.log(`server started at http://localhost:${listener.address().port}`);
});
