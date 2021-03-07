const express = require("express");

const app = express();

app.use(express.static("public"));

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log("started server on port " + port);
});

