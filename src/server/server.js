const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

let username = "Johannes from server";

app.options("/api/user", (req, res) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:1234");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Allow", "GET,HEAD,POST");
  res.status(200).end();
});

app.post("/api/user", (req, res) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:1234");
  username = req.body.username;
  res.status(200).end();
});

app.get("/api/user", (req, res) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:1234");
  res.json({ username });
});

const listener = app.listen(3000, () => {
  console.log(`server started at http://localhost:${listener.address().port}`);
});
