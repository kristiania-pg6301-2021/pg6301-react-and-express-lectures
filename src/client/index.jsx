import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useLoader } from "./useLoader";

function UserProfileForm() {
  const [username, setUsername] = useState("");
  const [postError, setPostError] = useState();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setPostError(undefined);
      const res = await fetch("http://localhost:3000/api/user", {
        method: "POST",
        body: JSON.stringify({ username }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error("Res failed: " + res.status);
      }
    } catch (e) {
      setPostError(e);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Set username</h2>
      {postError && <div>An error occurred: {postError.toString()}</div>}
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button>Submit</button>
    </form>
  );
}

function FrontPage() {
  const { data, error, loading } = useLoader(async () => {
    const res = await fetch("http://localhost:3000/api/user");
    if (!res.ok) {
      throw new Error("Res failed: " + res.status);
    }
    return await res.json();
  });

  if (error) {
    return <div>Error: {error.toString()}</div>;
  }
  if (loading || !data) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1>Hello there: {data.username}</h1>
      <UserProfileForm />
    </>
  );
}

function Application() {
  return <FrontPage />;
}

ReactDOM.render(<Application />, document.getElementById("root"));
