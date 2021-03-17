const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(
  session({
    secret: "dsglsnlrtkfnsdlkynwe",
    resave: false,
    saveUninitialized: false,
    cookie: {
      sameSite: "none",
      secure: true,
    },
  })
);

const username = "No user";

app.options("/api/user", (req, res) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:1234");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Allow", "GET,HEAD,POST");
  res.status(200).end();
});

app.post("/api/user", (req, res) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:1234");
  const { username } = req.body;
  req.session.username = username;
  res.status(200).end();
});

app.get("/api/user", (req, res) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:1234");
  res.json({ username: req.session.username || username });
});

const listener = app.listen(3000, () => {
  console.log(`server started at http://localhost:${listener.address().port}`);
});
