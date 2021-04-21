import * as React from "react";
import { useState } from "react";

export function ChatView({ onSendMessage, chatLog }) {
  const [message, setMessage] = useState("");

  function handleSubmitChatMessage(e) {
    e.preventDefault();
    onSendMessage(message);
    setMessage("");
  }

  return (
    <>
      <header>
        <h1>Welcome to CoronaChat</h1>
      </header>
      <main>
        <div id="chatLog">
          {chatLog.map((message, index) => (
            <div key={index}>{message}</div>
          ))}
        </div>
      </main>
      <footer>
        <form onSubmit={handleSubmitChatMessage}>
          <input
            type="text"
            autoFocus={true}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button>Submit</button>
        </form>
      </footer>
    </>
  );
}