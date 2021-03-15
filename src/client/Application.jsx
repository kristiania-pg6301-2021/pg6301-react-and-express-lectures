import { BrowserRouter, Link } from "react-router-dom";
import { Route, Switch } from "react-router";
import React from "react";
import { AccountPage } from "./AccountPage";

export function Application() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <h1>Hello world</h1>
          <ul>
            <li>
              <Link to="/my/account">Account page</Link>
            </li>
          </ul>
        </Route>
        <Route path="/my/account">
          <AccountPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
