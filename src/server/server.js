const express = require("express");
const path = require("path");
const fetch = require("node-fetch");

const app = express();

const discoveryURL =
  "https://accounts.google.com/.well-known/openid-configuration";

async function fetchJson(url, options) {
  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
  }
  return await res.json();
}

app.get("/api/profile", async (req, res) => {
  const Authorization = req.header("Authorization");
  if (!Authorization) {
    return res.send(401);
  }

  const { userinfo_endpoint } = await fetchJson(discoveryURL);
  const userinfo = await fetchJson(userinfo_endpoint, {
    headers: {
      Authorization,
    },
  });
  return res.json(userinfo);
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
