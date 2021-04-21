const express = require("express");
const path = require("path");

const app = express();
app.use(express.static(path.resolve(__dirname, "..", "..", "dist")));

const server = app.listen(3000, () => {
  console.log(`Started on port http://localhost:${server.address().port}`);
});
