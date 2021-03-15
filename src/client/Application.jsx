import { BrowserRouter, Link } from "react-router-dom";
import { Route, Switch } from "react-router";
import React from "react";
import { AccountPage } from "./AccountPage";

export function Application() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <h1>My bank</h1>
          <ul>
            <li>
              <Link to="/my/account">Account page</Link>
            </li>
          </ul>
        </Route>
        <Route path="/my/account">
          <AccountPage />
        </Route>
        <Route path="/login">
          <h1>Log in</h1>
        </Route>
        <Route>
          <h1>Not found</h1>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
