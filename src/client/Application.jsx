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
              "https://accounts.google.com/.well-known/openid-configuration"
            }
            client_id={
              "89654971890-e3lab068pu8mvl0avmmdbojskp8gjd9p.apps.googleusercontent.com"
            }
            scope={"profile"}
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
