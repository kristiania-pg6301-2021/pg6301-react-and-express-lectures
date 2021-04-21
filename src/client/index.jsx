import * as React from "react";
import { useEffect, useState } from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter, Link } from "react-router-dom";
import { Route, Switch } from "react-router";

async function fetchJSON(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch ${url}: ${response.status} ${response.statusText}`
    );
  }
  return await response.json();
}

function ErrorView(props) {
  return (
    <div>
      <h1>An error occurred</h1>
      <div>{props.error.toString()}</div>
    </div>
  );
}

function ProfilePage() {
  const [profile, setProfile] = useState();
  const [error, setError] = useState();

  useEffect(async () => {
    try {
      setProfile(await fetchJSON("http://localhost:3000/api/profile"));
    } catch (e) {
      setError(e);
    }
  }, []);

  if (error) {
    return <ErrorView error={error} />;
  }

  return <h1>Profile page</h1>;
}

function Application() {
  return (
    <BrowserRouter>
      <header>
        <Link to={"/"}>Home</Link>
      </header>
      <Switch>
        <Route path={"/"} exact>
          <h1>Home page</h1>
          <ul>
            <li>
              <Link to={"/profile"}>Profile</Link>
            </li>
            <li>
              <Link to={"/chat"}>Chat</Link>
            </li>
            <li>
              <Link to={"/login"}>Login</Link>
            </li>
          </ul>
        </Route>
        <Route path={"/profile"}>
          <ProfilePage />
        </Route>
        <Route path={"/chat"}>
          <h1>Chat page</h1>
        </Route>
        <Route path={"/login"}>
          <h1>Login page</h1>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

ReactDOM.render(<Application />, document.getElementById("app"));
