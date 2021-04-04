import React, { useEffect } from "react";
import { fetchJson } from "./http";
import { LoadingView } from "./LoadingView";
import { useHistory } from "react-router";

async function authorizationUrl({ client_id, scope, discovery_url }) {
  const { authorization_endpoint } = await fetchJson(discovery_url);
  const params = new URLSearchParams({
    response_type: "token",
    redirect_uri: window.location.href.split("#")[0],
    client_id,
    scope,
  });
  return authorization_endpoint + "?" + params;
}

export function LoginPage({ discovery_url, client_id, scope }) {
  const history = useHistory();
  async function redirectToLogin() {
    if (window.location.hash !== "") {
      const { access_token } = Object.fromEntries(
        new URLSearchParams(window.location.hash.substr(1))
      );
      localStorage.setItem("access_token", access_token);
      history.push("/");
    } else {
      window.location.href = await authorizationUrl({
        discovery_url,
        client_id,
        scope,
      });
    }
  }

  useEffect(redirectToLogin);

  if (window.location.hash !== "") {
    return <div>Handling callback</div>;
  }

  return <LoadingView />;
}
