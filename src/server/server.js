require("dotenv").config();
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");

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

const client_id = process.env.MICROSOFT_CLIENT_ID;
const discovery_url = process.env.MICROSOFT_DISCOVERY_ENDPOINT;

app.get("/api/user", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:1234");
  const authorization = req.header("Authorization");
  if (authorization) {
    const discovery = await fetch(discovery_url);
    if (!discovery.ok) {
      console.error(discovery);
      return res.status(500).send();
    }
    const { userinfo_endpoint } = await discovery.json();

    const userinfoRes = await fetch(userinfo_endpoint, {
      headers: { authorization },
    });
    console.log(userinfoRes.status);
    if (userinfoRes.ok) {
      const userinfo = await userinfoRes.json();
      console.log(userinfo);
      return res.json({
        loggedIn: true,
        username: userinfo.name || userinfo.pid,
      });
    } else if (userinfoRes.status === 400) {
      return res.status(401).send();
    }
  }
  res.json({
    loggedIn: false,
    username: req.session.username || username,
    client_id,
    discovery_url,
    scopes: "openid profile email",
  });
});

const listener = app.listen(3000, () => {
  console.log(`server started at http://localhost:${listener.address().port}`);
});
