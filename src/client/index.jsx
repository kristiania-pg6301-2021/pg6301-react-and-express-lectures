import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { ChatPage } from "./ChatPage";
import { UsernameForm } from "./UsernameForm";

function useSessionStorage(key) {
  const [value, setValue] = useState(sessionStorage.getItem(key));
  useEffect(() => {
    sessionStorage.setItem(key, value);
  }, [value]);
  return [value, setValue];
}

function Application() {
  const [username, setUsername] = useSessionStorage("username");

  if (!username) {
    return <UsernameForm onUsername={setUsername} />;
  }

  return <ChatPage username={username} />;
}

ReactDOM.render(<Application />, document.getElementById("app"));
