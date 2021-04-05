import React, { useEffect, useState } from "react";
import { fetchJSON } from "./http";
import { ErrorView } from "./errorView";
import { LoadingView } from "./loadingView";

export function LoginView({ loginProvider, onLoggedIn }) {
  const redirect_uri = window.location.origin;
  const hash = Object.fromEntries(
    new URLSearchParams(window.location.hash.substr(1))
  );
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  async function authorize() {
    const { discovery_url, client_id, scope } = loginProvider;
    const { authorization_endpoint } = await fetchJSON(discovery_url);

    const loginState = {
      state: randomString(30),
      code_verifier: randomString(50),
    };
    sessionStorage.setItem("loginState", JSON.stringify(loginState));
    const { state, code_verifier } = loginState;

    const params = {
      client_id,
      redirect_uri,
      response_type: "code",
      response_mode: "fragment",
      scope,
      state,
      code_challenge_method: "S256",
      code_challenge: await sha256(code_verifier),
    };

    window.location.href =
      authorization_endpoint + "?" + new URLSearchParams(params);
  }

  async function fetchToken() {
    const { code, error } = hash;

    if (error) {
      return setError(error);
    }
    if (!code) {
      setLoading(false);
      return;
    }

    try {
      const { discovery_url, client_id } = loginProvider;
      const { token_endpoint } = await fetchJSON(discovery_url);
      const loginState = JSON.parse(sessionStorage.getItem("loginState"));
      const { code_verifier } = loginState;
      const payload = {
        client_id,
        code,
        redirect_uri,
        code_verifier,
        grant_type: "authorization_code",
      };

      const tokenResponse = await fetchJSON(token_endpoint, {
        method: "POST",
        body: new URLSearchParams(payload),
      });
      localStorage.setItem("authorization", JSON.stringify(tokenResponse));
      sessionStorage.removeItem("loginState");
      onLoggedIn();
    } catch (e) {
      console.log("failed to get token");
      setError(e);
    } finally {
      console.log("done with token");
      setLoading(false);
      window.location.hash = "";
    }
  }
  useEffect(fetchToken, [hash]);

  if (error) {
    return <ErrorView error={error} reload={authorize} />;
  }
  if (loading) {
    return <LoadingView />;
  }

  return <button onClick={authorize}>Log me in</button>;
}

export function randomString(length) {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmopqrstuvwxyz1234567890";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return result;
}

export async function sha256(string) {
  const binaryHash = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder("utf-8").encode(string)
  );
  return btoa(String.fromCharCode.apply(null, new Uint8Array(binaryHash)))
    .split("=")[0]
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}
