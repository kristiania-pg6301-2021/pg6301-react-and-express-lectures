import { BrowserRouter, Link } from "react-router-dom";
import { Route, Switch } from "react-router";
import React, { useEffect, useState } from "react";
import { LoginView } from "./loginView";

function useLoader(loadingFunction) {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  async function reload() {
    setData(undefined);
    setLoading(true);
    setError(undefined);
    try {
      setData(await loadingFunction());
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(reload, []);

  return { data, loading, error, reload };
}

function ErrorView({ error, reload }) {
  return (
    <div>
      <h1>An error occurred</h1>
      <div>{error.toString()}</div>
      <button onClick={reload}>Retry</button>
    </div>
  );
}

function LoadingView() {
  return <div>Loading</div>;
}

export function Application({ api }) {
  const { data, loading, error, reload } = useLoader(api.getUserinfo);

  if (error) {
    return <ErrorView error={error} reload={reload} />;
  }
  if (loading) {
    return <LoadingView />;
  }

  if (!data.user) {
    return <LoginView loginProvider={data.loginProvider} />;
  }

  return (
    <BrowserRouter>
      <header>
        <Link to={"/"}>Kristiania Quiz: {data.user.username}</Link>
      </header>
      <main>
        <Switch>
          <Route path="/login">
            <h1>Login</h1>
          </Route>
          <Route path="/" exact>
            <h1>Home page</h1>
            <ul>
              <li>
                <Link to={"/login"}>Login</Link>
              </li>
            </ul>
          </Route>
        </Switch>
      </main>
    </BrowserRouter>
  );
}
