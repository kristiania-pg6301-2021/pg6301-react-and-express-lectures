const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();

app.use(cors());

const apiRouter = express.Router();

apiRouter.get("/profile", (req, res) => {
  res.json({
    message: "Not logged in",
  });
});

app.use("/api", apiRouter);

app.use(express.static(path.resolve(__dirname, "..", "..", "dist")));
app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api")) {
    return res.sendFile(
      path.resolve(__dirname, "..", "..", "dist", "index.html")
    );
  }
  return next();
});

app.listen(3000);
