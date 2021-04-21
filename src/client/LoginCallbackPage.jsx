import * as React from "react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { fetchJson } from "./http";

export function LoginCallbackPage({ onAccessToken, identityProvider }) {
  const hash = Object.fromEntries(
    new URLSearchParams(window.location.hash.substr(1))
  );
  const [error, setError] = useState();

  const history = useHistory();

  useEffect(async () => {
    const loginState = JSON.parse(sessionStorage.getItem("loginState"));
    const { access_token, state, code, error } = hash;

    if (state !== loginState.state) {
      alert("Why are you here?");
      return;
    }
    if (error) {
      setError(error);
      return;
    }
    if (access_token) {
      onAccessToken(access_token);
      // TODO: I'll keep this for now for debugging
      //sessionStorage.removeItem("loginState");
      history.push("/");
      return;
    }
    if (code) {
      const { token_endpoint } = await fetchJson(identityProvider.discoveryURL);
      const params = {
        grant_type: "authorization_code",
        code,
        client_id: identityProvider.client_id,
        redirect_uri: window.location.origin + "/login/callback",
        code_verifier: loginState.code_verifier,
      };
      const tokenResponse = await fetchJson(token_endpoint, {
        method: "POST",
        body: new URLSearchParams(params),
      });
      console.log(tokenResponse);
      onAccessToken(tokenResponse.access_token);
      history.push("/");
      return;
    }
  }, [hash]);

  if (error) {
    return (
      <div>
        <h1>An error occurred</h1>
        <div>{error.toString()}</div>
      </div>
    );
  }

  return <h1>Login callback</h1>;
}
