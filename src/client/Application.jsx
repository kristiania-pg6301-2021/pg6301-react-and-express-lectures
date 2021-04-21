import { BrowserRouter, Link } from "react-router-dom";
import { Route, Switch } from "react-router";
import { ProfilePage } from "./ProfilePage";
import * as React from "react";

export function Application() {
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