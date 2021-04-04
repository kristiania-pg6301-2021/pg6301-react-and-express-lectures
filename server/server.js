const express = require("express");
const https = require("https");
const fs = require("fs");

const app = express();

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
