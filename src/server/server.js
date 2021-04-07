const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/api/profile", (req, res) => {
  res.json({
    hello: "world",
    loginProvider: {
      discoveryUrl: "https://accounts.google.com/.well-known/openid-configuration",
      client_id: "89654971890-sc10avhkormbba0dcii3uu66n3bg00ks.apps.googleusercontent.com"
    }
  })
})


app.listen(3000);


