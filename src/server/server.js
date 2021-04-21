const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();
const ws = require("ws");

const wsServer = new ws.Server({ noServer: true });
const sockets = [];
let messageIndex = 0;

wsServer.on("connection", (socket) => {
  // Add this connection to the list of connections
  sockets.push(socket);
  let socketUsername;
  socket.on("message", (msg) => {
    const wsMessage = JSON.parse(msg);
    const { type } = wsMessage;
    if (type === "message") {
      const { message } = wsMessage;
      const username = socketUsername;
      const id = messageIndex++;
      for (const recipient of sockets) {
        recipient.send(JSON.stringify({ id, message, username }));
      }
    } else if (type === "login") {
      const { username } = wsMessage;
      socketUsername = username;
    }
  });
});

app.use(cors());

app.use("/api", require("./apiRouter"));

app.use(express.static(path.resolve(__dirname, "..", "..", "dist")));
app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api")) {
    return res.sendFile(
      path.resolve(__dirname, "..", "..", "dist", "index.html")
    );
  }
  return next();
});

const server = app.listen(3000, () => {
  server.on("upgrade", (req, socket, head) => {
    wsServer.handleUpgrade(req, socket, head, (socket) => {
      // This will pass control to `wsServer.on("connection")`
      wsServer.emit("connection", socket, req);
    });
  });
});
