const express = require("express");
const apiRouter = express.Router();

apiRouter.get("/profile", (req, res) => {
  res.json({
    message: "Not logged in",
  });
});

module.exports = apiRouter;
