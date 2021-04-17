import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

function useLocalStorage(key) {
  const [value, setValue] = useState(localStorage.getItem(key));
  useEffect(() => {
    localStorage.setItem(key, value);
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
    };
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const newChat = { username, message, id: chatLog.length };
    setMessage("");

    setChatLog([...chatLog, newChat]);

    ws.send(newChat);
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
  const [username, setUsername] = useLocalStorage("username");

  if (!username) {
    return <UsernameForm onUsername={setUsername} />;
  }

  return <ChatPage username={username} />;
}

ReactDOM.render(<Application />, document.getElementById("app"));
