const express = require("express");

const app = express();

app.get("/api/profile", (req, res) => {
  res.json({
    hello: "world"
  })
})


app.listen(3000);


