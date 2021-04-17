const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(path.resolve(__dirname, "..", "..", "dist")));

const server = app.listen(3000, () => {
  console.log(`Listening on http://localhost:${server.address().port}`);
});
