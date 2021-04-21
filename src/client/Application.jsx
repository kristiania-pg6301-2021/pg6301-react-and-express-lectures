import * as React from "react";
import { useEffect, useState } from "react";
import { BrowserRouter, Link } from "react-router-dom";
import { Route, Switch } from "react-router";
import { ProfilePage } from "./ProfilePage";
import { fetchJson } from "./http";
import { LoginPage } from "./LoginPage";
import { LoginCallbackPage } from "./LoginCallbackPage";

function useLocalStorage(key) {
  const [value, setValue] = useState(() =>
    JSON.parse(localStorage.getItem(key))
  );
  useEffect(() => {
    if (value) {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      localStorage.removeItem(key);
    }
  }, [value]);

  return [value, setValue];
}

export function Application() {
  const [access_token, setAccess_token] = useLocalStorage("access_token");

  const googleIdentityProvider = {
    discoveryURL:
      "https://accounts.google.com/.well-known/openid-configuration",
    client_id:
      "89654971890-966v5po9guds812ktsvfig973vfqsg3f.apps.googleusercontent.com",
    scope: "openid profile email",
  };
  const microsoftIdentityProvider = {
    discoveryURL:
      "https://login.microsoftonline.com/common/.well-known/openid-configuration",
    client_id: "d8984955-1066-496a-8968-2fa6fe21dca6",
    scope: "openid profile email",
  };
  const idportenIdentityProvider = {
    discoveryURL:
      "https://oidc-ver1.difi.no/idporten-oidc-provider/.well-known/openid-configuration",
    client_id: "8dd4d4aa-52a5-4b94-baa6-6d69a654490e",
    scope: "openid profile",
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
