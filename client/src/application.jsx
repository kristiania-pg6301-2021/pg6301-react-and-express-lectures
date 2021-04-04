import { BrowserRouter, Link } from "react-router-dom";
import { Route, Switch } from "react-router";
import React from "react";
import { LoginView } from "./loginView";
import { ErrorView } from "./errorView";
import { LoadingView } from "./loadingView";
import { useLoader } from "./useLoader";

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
