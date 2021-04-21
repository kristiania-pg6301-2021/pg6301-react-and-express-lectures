import * as React from "react";
import { useState } from "react";

export function ChatPage() {
  const [chatLog, setChatLog] = useState([]);
  const [message, setMessage] = useState("");

  function handleSubmitMessage(e) {
    e.preventDefault();
    setChatLog([...chatLog, message]);
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
