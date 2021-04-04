require("dotenv").config();
const express = require("express");
const path = require("path");
const https = require("https");
const fs = require("fs");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");

const app = express();

app.use(bodyParser.json());

const loginProviders = [
  {
    name: "Google",
    discovery_url:
      "https://accounts.google.com/.well-known/openid-configuration",
    client_id: process.env.GOOGLE_CLIENT_ID,
    scope: "openid email profile",
    use_pkce: false,
  },
  {
    name: "Active Directory",
    discovery_url:
      "https://login.microsoftonline.com/common/.well-known/openid-configuration",
    client_id: process.env.MICROSOFT_CLIENT_ID,
    scope: "openid email profile",
    use_pkce: true,
  },
  {
    name: "ID-porten",
    discovery_url:
      "https://oidc-ver1.difi.no/idporten-oidc-provider/.well-known/openid-configuration",
    client_id: process.env.IDPORTEN_CLIENT_ID,
    scope: "openid",
    use_pkce: true,
  },
];
app.get("/api/loginProviders", (req, res) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://webapps.kristiania.no:1234"
  );
  res.json(loginProviders);
});

app.post("/api/profile", async (req, res) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://webapps.kristiania.no:1234"
  );
  const authorization = req.header("Authorization");
  const loginProvider = loginProviders.find(
    (p) => p.name === req.header("X-Login-Provider")
  );
  if (authorization && loginProvider) {
    let discoveryResponse = await fetch(loginProvider.discovery_url);
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
    console.log(loginProvider.name, { userinfo });
    res.json({ username: userinfo.name || userinfo.pid });
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
