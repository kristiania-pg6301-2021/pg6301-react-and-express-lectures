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

module.exports = wsServer;
