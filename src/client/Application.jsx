import { BrowserRouter, Link } from "react-router-dom";
import { Route, Switch } from "react-router";
import { ProfilePage } from "./ProfilePage";
import { LoginPage } from "./LoginPage";
import { FrontPage } from "./FrontPage";
import React from "react";

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
          <LoginPage
            discovery_url={
              "https://login.microsoftonline.com/common/.well-known/openid-configuration"
            }
            client_id={"59318b7b-982c-46b2-a2f4-3009d09015ae"}
            response_type={"code"}
            scope={"openid profile email"}
          />
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
