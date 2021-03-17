import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useLoader } from "./useLoader";
import { UserApi } from "./UserApi";

function UserProfileForm({ userApi, reload }) {
  const [username, setUsername] = useState("");
  const [postError, setPostError] = useState();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setPostError(undefined);
      await userApi.postUser({ username });
      reload();
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

function FrontPage({ userApi }) {
  const { data, error, loading, reload } = useLoader(
    async () => await userApi.fetchUser()
  );

  if (error) {
    return <div>Error: {error.toString()}</div>;
  }
  if (loading || !data) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1>Hello there: {data.username}</h1>
      <UserProfileForm userApi={userApi} reload={reload} />
    </>
  );
}

function Application() {
  return <FrontPage userApi={new UserApi()} />;
}

ReactDOM.render(<Application />, document.getElementById("root"));
