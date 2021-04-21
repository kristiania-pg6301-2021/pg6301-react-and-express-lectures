import * as React from "react";
import { useEffect, useState } from "react";

function ChatLoginPage({ onLogin }) {
  const [username, setUsername] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    onLogin(username);
  }
  return (
    <div>
      <h1>Please log in</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button>Login</button>
      </form>
    </div>
  );
}

export function ChatPage() {
  const [username, setUsername] = useState();
  if (!username) {
    return <ChatLoginPage onLogin={(username) => setUsername(username)} />;
  }

  return <ChatView username={username} />;
}

export function ChatView({ username }) {
  const [chatLog, setChatLog] = useState([]);
  const [message, setMessage] = useState("");
  const [ws, setWs] = useState();

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3000");
    ws.onmessage = (event) => {
      console.log("message", event);
      const { message, id, username } = JSON.parse(event.data);
      setChatLog((chatLog) => [
        ...chatLog,
        id + ": from " + username + ": " + message,
      ]);
    };
    ws.onopen = (event) => {
      ws.send(
        JSON.stringify({
          type: "login",
          username,
        })
      );
    };
    setWs(ws);
  }, []);

  function handleSubmitMessage(e) {
    e.preventDefault();
    ws.send(
      JSON.stringify({
        type: "message",
        message: message,
      })
    );
    setMessage("");
  }

  return (
    <div>
      <h1>Chat page</h1>
      <div>
        {chatLog.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
      <div>
        <form onSubmit={handleSubmitMessage}>
          <input
            type="text"
            autoFocus={true}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button>Send</button>
        </form>
      </div>
    </div>
  );
}
