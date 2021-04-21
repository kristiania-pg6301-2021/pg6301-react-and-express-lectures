import * as React from "react";
import * as ReactDOM from "react-dom";
import { useEffect, useState } from "react";

function ChatApplication() {
  const [chatLog, setChatLog] = useState([]);
  const [message, setMessage] = useState("");
  const [ws, setWs] = useState();

  useEffect(() => {
    const ws = new WebSocket("ws://" + window.location);
    ws.onopen = (event) => {
      console.log("opened", event);
    };
    ws.onmessage = (event) => {
      console.log("message", event);
    };
    ws.onclose = (event) => {
      console.log("close", event);
    };
    setWs(ws);
  }, []);

  function handleSubmitChatMessage(e) {
    e.preventDefault();
    setChatLog([...chatLog, message]);
    ws.send(message);
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
