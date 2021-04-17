import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

function useSessionStorage(key) {
  const [value, setValue] = useState(sessionStorage.getItem(key));
  useEffect(() => {
    sessionStorage.setItem(key, value);
  }, [value]);
  return [value, setValue];
}

function UsernameForm({ onUsername }) {
  const [usernameField, setUsernameField] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onUsername(usernameField);
      }}
    >
      <h1>Enter your username</h1>
      <input
        autoFocus={true}
        type="text"
        value={usernameField}
        onChange={(e) => setUsernameField(e.target.value)}
      />
      <button>Submit</button>
    </form>
  );
}

function ChatPage({ username }) {
  const [chatLog, setChatLog] = useState([]);
  const [message, setMessage] = useState("");
  const [ws, setWs] = useState();

  useEffect(() => {
    const ws = new WebSocket("ws://" + window.location.host);
    setWs(ws);
    ws.onopen = (event) => {
      console.log("Opened", event);
    };
    ws.onerror = (event) => {
      console.log(event);
    };
    ws.onmessage = (msg) => {
      console.log(msg);
      const { username, message, id } = JSON.parse(msg.data);
      setChatLog((chatLog) => [...chatLog, { username, message, id }]);
    };
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    ws.send(JSON.stringify({ username, message }));
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
        {chatLog.map(({ id, username, message }) => (
          <div key={id}>
            <strong>{username}:</strong> {message}
          </div>
        ))}
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

function Application() {
  const [username, setUsername] = useSessionStorage("username");

  if (!username) {
    return <UsernameForm onUsername={setUsername} />;
  }

  return <ChatPage username={username} />;
}

ReactDOM.render(<Application />, document.getElementById("app"));
