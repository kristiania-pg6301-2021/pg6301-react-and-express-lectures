import React from "react";
import { fetchJSON } from "./http";

export function LoginView({ loginProvider }) {
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
      redirect_uri: window.location.origin,
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

  return <button onClick={authorize}>Log in</button>;
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
