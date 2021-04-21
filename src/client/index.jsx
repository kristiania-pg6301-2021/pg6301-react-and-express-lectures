import * as React from "react";
import * as ReactDOM from "react-dom";
import { useState } from "react";

function ChatApplication() {
  const ws = new WebSocket();
  ws.onmessage;

  const [chatLog, setChatLog] = useState([]);
  const [message, setMessage] = useState("");

  function handleSubmitChatMessage(e) {
    e.preventDefault();
    setChatLog([...chatLog, message]);
    setMessage("");
  }

  return (
    <>
      <header>
        <h1>Welcome to Home Alone Chat</h1>
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

ReactDOM.render(<ChatApplication />, document.getElementById("app"));
