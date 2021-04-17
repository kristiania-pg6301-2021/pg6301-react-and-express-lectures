const express = require("express");
const ws = require("ws");
const path = require("path");

const app = express();

app.use(express.static(path.resolve(__dirname, "..", "..", "dist")));

const sockets = [];

const wsServer = new ws.Server({ noServer: true });
wsServer.on("connection", (socket) => {
  sockets.push(socket);
  socket.send("Hello there");
  socket.on("message", (message) => {
    console.log({ message });
    for (const recipient of sockets) {
      recipient.send(message);
    }
  });
});

const server = app.listen(3000, () => {
  console.log(`Listening on http://localhost:${server.address().port}`);

  server.on("upgrade", (req, socket, head) => {
    wsServer.handleUpgrade(req, socket, head, (socket) => {
      wsServer.emit("connection", socket, req);
    });
  });
});
