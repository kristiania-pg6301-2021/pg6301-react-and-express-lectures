const express = require("express");

const app = express();

const listener = app.listen(3000, () => {
  console.log(`server started at http://localhost:${listener.address().port}`);
});
