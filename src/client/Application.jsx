import * as React from "react";
import { useState } from "react";
import { BrowserRouter, Link } from "react-router-dom";
import { Route, Switch } from "react-router";
import { ProfilePage } from "./ProfilePage";
import { fetchJson } from "./http";
import { LoginPage } from "./LoginPage";
import { LoginCallbackPage } from "./LoginCallbackPage";

export function Application() {
  const [access_token, setAccess_token] = useState();

  const googleIdentityProvider = {
    discoveryURL:
      "https://accounts.google.com/.well-known/openid-configuration",
    client_id:
      "89654971890-966v5po9guds812ktsvfig973vfqsg3f.apps.googleusercontent.com",
  };
  const microsoftIdentityProvider = {
    discoveryURL:
      "https://login.microsoftonline.com/common/.well-known/openid-configuration",
    client_id: "d8984955-1066-496a-8968-2fa6fe21dca6",
  };

  async function loadProfile() {
    return fetchJson("/api/profile", {
      headers: {
        ...(access_token ? { Authorization: `Bearer ${access_token}` } : {}),
      },
    });
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
          <LoginPage identityProvider={microsoftIdentityProvider} />
        </Route>
        <Route path={"/login/callback"}>
          <LoginCallbackPage
            identityProvider={microsoftIdentityProvider}
            onAccessToken={(access_token) => setAccess_token(access_token)}
          />
        </Route>
        <Route>
          <h1>Not found</h1>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
