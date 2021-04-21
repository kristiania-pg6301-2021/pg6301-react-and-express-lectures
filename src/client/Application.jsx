import * as React from "react";
import { BrowserRouter, Link } from "react-router-dom";
import { Route, Switch } from "react-router";
import { ProfilePage } from "./ProfilePage";
import { fetchJson } from "./http";

export function Application() {
  async function loadProfile() {
    return fetchJson("/api/profile");
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path={"/"} exact>
          <h1>Welcome</h1>
          <ul>
            <li>
              <Link to={"/profile"}>Profile</Link>
            </li>
            <li>
              <Link to={"/login"}>Login</Link>
            </li>
          </ul>
        </Route>
        <Route path={"/profile"}>
          <ProfilePage loadProfile={loadProfile} />
        </Route>
        <Route path={"/login"} exact>
          <h1>Login</h1>
        </Route>
        <Route path={"/login/callback"}>
          <h1>Login callback</h1>
        </Route>
        <Route>
          <h1>Not found</h1>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
