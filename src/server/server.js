const express = require("express");
const path = require("path");
const fetch = require("node-fetch");

const app = express();

const googleDiscoveryURL =
  "https://accounts.google.com/.well-known/openid-configuration";
const microsoftDiscoveryURL =
  "https://login.microsoftonline.com/common/.well-known/openid-configuration";
const idportenDiscoveryURL =
  "https://oidc-ver1.difi.no/idporten-oidc-provider/.well-known/openid-configuration";

async function fetchJson(url, options) {
  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
  }
  return await res.json();
}

app.use(async (req, res, next) => {
  const Authorization = req.header("Authorization");
  if (Authorization) {
    const { userinfo_endpoint } = await fetchJson(microsoftDiscoveryURL);
    req.userinfo = await fetchJson(userinfo_endpoint, {
      headers: {
        Authorization,
      },
    });
  }
  next();
});

app.get("/api/profile", async (req, res) => {
  if (!req.userinfo) {
    return res.send(401);
  }
  return res.json(req.userinfo);
});

app.use(express.static(path.resolve(__dirname, "..", "..", "dist")));
app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api")) {
    return res.sendFile(
      path.resolve(__dirname, "..", "..", "dist", "index.html")
    );
  }
  next();
});

const server = app.listen(3000, () => {
  console.log(`server started on http://localhost:${server.address().port}`);
});
