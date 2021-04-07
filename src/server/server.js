const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
app.use(cors());

const discoveryUrl = "https://accounts.google.com/.well-known/openid-configuration";


async function fetchJSON(url, options) {
  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error(`${url}: ${res.status} ${res.statusText}`);
  }
  return await res.json();
}

app.get("/api/profile", async (req, res) => {
  
  const {userinfo_endpoint} = await fetchJSON(discoveryUrl);
  console.log({userinfo_endpoint});
  
  const userinfo = await fetchJSON(userinfo_endpoint, {
    headers: {
      Authorization: req.header("authorization")
    }
  });
  
  res.json({
    userinfo,
    loginProvider: {
      label: "Google",
      discoveryUrl,
      client_id: "89654971890-sc10avhkormbba0dcii3uu66n3bg00ks.apps.googleusercontent.com"
    }
  })
})


app.listen(3000);


