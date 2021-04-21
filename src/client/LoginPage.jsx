import * as React from "react";
import { fetchJson } from "./http";

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
    new TextEncoder().encode(string)
  );
  return btoa(String.fromCharCode.apply(null, new Uint8Array(binaryHash)))
    .split("=")[0]
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

export function LoginPage({ identityProvider }) {
  const { discoveryURL, client_id } = identityProvider;

  async function handleLogin() {
    const { authorization_endpoint } = await fetchJson(discoveryURL);

    const state = randomString(30);
    const code_verifier = randomString(50);
    const loginState = { state, code_verifier };
    sessionStorage.setItem("loginState", JSON.stringify(loginState));

    const params = {
      client_id,
      response_type: "code",
      response_mode: "fragment",
      scope: "openid profile",
      redirect_uri: window.location.origin + "/login/callback",
      state,
      code_challenge: await sha256(code_verifier),
      code_challenge_method: "S256",
    };
    window.location.href =
      authorization_endpoint + "?" + new URLSearchParams(params);
  }

  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
