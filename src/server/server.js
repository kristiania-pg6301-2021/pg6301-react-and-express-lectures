require("dotenv").config();
const express = require("express");
const path = require("path");
const https = require("https");
const fs = require("fs");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");

const app = express();

app.use(bodyParser.json());

app.post("/api/profile", async (req, res) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://webapps.kristiania.no:1234"
  );
  const authorization = req.header("Authorization");
  if (authorization) {
    let discoveryResponse = await fetch(
      "https://accounts.google.com/.well-known/openid-configuration"
    );
    if (!discoveryResponse.ok) {
      console.error(discoveryResponse);
      return res.status(500).send();
    }
    const { userinfo_endpoint } = await discoveryResponse.json();
    const userInfoResponse = await fetch(userinfo_endpoint, {
      headers: { authorization },
    });
    if (!userInfoResponse.ok) {
      console.error(userInfoResponse);
      return res.status(401).send();
    }
    const userinfo = await userInfoResponse.json();
    res.json({ username: userinfo.name });
  }
  return res.status(401).send();
});

app.options("/api/profile", (req, res) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://webapps.kristiania.no:1234"
  );
  res.header("Access-Control-Allow-Headers", "*");
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
    console.log(`server started on https://localhost:${server.address().port}`);
  });
