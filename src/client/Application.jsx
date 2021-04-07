import { BrowserRouter, Link } from "react-router-dom";
import { Route, Switch } from "react-router";
import { ProfilePage } from "./ProfilePage";
import { LoginPage } from "./LoginPage";
import { FrontPage } from "./FrontPage";
import React from "react";
import { AuthorizationCallback } from "./AuthorizationCallback";

export function Application() {
  return (
    <BrowserRouter>
      <header>
        <Link to="/">Front page</Link>
      </header>
      <Switch>
        <Route path="/profile">
          <ProfilePage />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path={"/oauth2callback"}>
          <AuthorizationCallback />
        </Route>
        <Route exact path="/">
          <FrontPage />
        </Route>
        <Route>
          <h1>Not found</h1>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
