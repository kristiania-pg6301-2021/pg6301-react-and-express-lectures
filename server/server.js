require("dotenv").config();
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const https = require("https");
const fs = require("fs");
const fetch = require("node-fetch");
const bodyParser = require("body-parser");
const { quizApp, pickSome } = require("./quizApp");

const app = express();
app.use(
  cors({
    preflightContinue: true,
    credentials: true,
    origin: "https://webapps.kristiania.no:1234",
  })
);
app.use(
  session({
    secret: "sdgnslgnaølawrhopisdnflka",
    resave: false,
    saveUninitialized: false,
    cookie: {
      sameSite: "none",
      secure: true,
    },
  })
);
app.use(bodyParser.json());

async function fetchJSON(url, options) {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`${url}: ${response.status} ${response.statusText}`);
  }
  return await response.json();
}

const discovery_url =
  "https://login.microsoftonline.com/common/.well-known/openid-configuration";
const client_id = process.env.MICROSOFT_CLIENT_ID;

app.use(async (req, res, next) => {
  const Authorization = req.header("Authorization");
  if (Authorization) {
    const { userinfo_endpoint } = await fetchJSON(discovery_url);
    try {
      req.userinfo = await fetchJSON(userinfo_endpoint, {
        headers: { Authorization },
      });
    } catch (e) {
      console.warn(e);
    }
  }
  next();
});

app.get("/api/userinfo", async (req, res) => {
  let user = undefined;
  if (req.userinfo) {
    user = {
      username: req.userinfo.name,
      id: req.userinfo.upn,
    };
  }
  res.json({
    user,
    loginProvider: { discovery_url, client_id, scope: "openid email profile" },
  });
});

const questionDb = JSON.parse(fs.readFileSync("./questions.json"));

app.use(
  "/api/quiz",
  quizApp({
    selectQuestions: () => pickSome(Object.keys(questionDb), 4),
    getQuestion: (index) => questionDb[index],
  })
);

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
