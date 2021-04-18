import React, { useEffect, useRef, useState } from "react";

function useWsChat() {
  const [chatLog, setChatLog] = useState([]);
  const [ws, setWs] = useState();
  const connected = useRef(false);

  function connect() {
    console.log("Connecting");
    const ws = new WebSocket("ws://" + window.location.host);
    setWs(ws);
    ws.onopen = (event) => {
      console.log("Opened", event);
      connected.current = true;
    };
    ws.onclose = () => {
      if (connected.current) {
        setTimeout(connect, 1000);
      } else {
        setTimeout(connect, 10000);
      }
      connected.current = false;
    };
    ws.onerror = (event) => {
      console.log(event);
    };
    ws.onmessage = (msg) => {
      console.log(msg);
      const { username, message, id } = JSON.parse(msg.data);
      setChatLog((chatLog) => [...chatLog, { username, message, id }]);
    };
  }

  useEffect(() => connect(), []);

  function sendMessage(json) {
    ws.send(JSON.stringify(json));
  }
  return { chatLog, sendMessage };
}

export function ChatPage({ username }) {
  const { chatLog, sendMessage } = useWsChat();

  function handleSendMessage(message) {
    sendMessage({ username, message });
  }

  return (
    <ChatView
      username={username}
      chatLog={chatLog}
      onSendMessage={handleSendMessage}
    />
  );
}

export function ChatView({ username, chatLog, onSendMessage }) {
  const [message, setMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onSendMessage(message);
    setMessage("");
  }

  return (
    <>
      <header>
        <h1>Chat application</h1>
      </header>
      <main>
        <h2>Chat started...</h2>
        <div>Welcome {username}</div>
        <div className={"chatLog"}>
          {chatLog.map(({ id, username, message }) => (
            <div key={id} className={"message"}>
              <strong>{username}:</strong> {message}
            </div>
          ))}
        </div>
      </main>
      <footer>
        <form onSubmit={handleSubmit}>
          <input
            autoFocus={true}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button>Send</button>
        </form>
      </footer>
    </>
  );
}
