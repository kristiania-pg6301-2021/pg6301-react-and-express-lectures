require("dotenv").config();
const express = require("express");
const cors = require("cors");
const https = require("https");
const fs = require("fs");

const app = express();
app.use(cors());

app.get("/api/userinfo", (req, res) => {
  res.json({
    loginProvider: {
      discovery_url:
        "https://login.microsoftonline.com/common/.well-known/openid-configuration",
      client_id: process.env.MICROSOFT_CLIENT_ID,
    },
  });
});

const server = https
  .createServer(
    {
      key: fs.readFileSync("../server.key"),
      cert: fs.readFileSync("../server.crt"),
    },
    app
  )
  .listen(3000, () => {
    console.log(
      `started server on https://webapps.kristiania.no:${server.address().port}`
    );
  });
