import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useLoader } from "./useLoader";
import { UserApi } from "./UserApi";
import { LoginView } from "./loginView";

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

function useLocalStorage(key) {
  const [value, setValue] = useState(() => localStorage.getItem(key));
  function handleSetValue(value) {
    if (value) {
      localStorage.setItem(key, value);
    } else {
      localStorage.removeItem(key);
    }
    setValue(value);
  }
  return [value, handleSetValue];
}

function FrontPage({ userApi }) {
  const [authorizationError, setAuthorizationError] = useState();
  const [accessToken, setAccessToken] = useLocalStorage("access_token");
  const { data, error, loading, reload } = useLoader(
    async () => await userApi.fetchUser(accessToken),
    [accessToken]
  );

  if (error) {
    if (error.status === 401) {
      setAccessToken(undefined);
      reload();
    } else {
      return <div>Error: {error.toString()}</div>;
    }
  }
  if (loading || !data) {
    return <div>Loading...</div>;
  }

  if (data.loggedIn) {
    return (
      <>
        <h1>Hello there: {data.username}</h1>
      </>
    );
  }

  if (authorizationError) {
    return (
      <div>
        Authorization error: {authorizationError.error}
        <div>{authorizationError.error_description}</div>
      </div>
    );
  }

  if (!data.loggedIn) {
    return (
      <LoginView
        client_id={data.client_id}
        discovery_url={data.discovery_url}
        scope={data.scope}
        onComplete={({ access_token }) => {
          console.log({ access_token });
          window.history.pushState("", "/", window.location.pathname);
          setAccessToken(access_token);
        }}
        onError={(error, error_description) => {
          console.error({ error, error_description });
          window.history.pushState("", "/", window.location.pathname);
          setAuthorizationError({ error, error_description });
        }}
      />
    );
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
