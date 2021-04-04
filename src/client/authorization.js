import { fetchJson } from "./http";

export async function authorizationUrl({
  discovery_url,
  client_id,
  scope,
  state,
  response_type = "token",
  response_mode,
  code_challenge,
  code_challenge_method,
}) {
  const { authorization_endpoint } = await fetchJson(discovery_url);
  const params = new URLSearchParams({
    response_type,
    response_mode,
    redirect_uri: window.location.href.split("#")[0],
    client_id,
    state,
    scope,
    code_challenge,
    code_challenge_method,
  });
  return authorization_endpoint + "?" + params;
}

export async function fetchAccessToken({
  discovery_url,
  client_id,
  code,
  code_verifier,
  grant_type = "authorization_code",
}) {
  const { token_endpoint } = await fetchJson(discovery_url);
  const tokenRequest = {
    redirect_uri: window.location.href.split("#")[0],
    client_id,
    code,
    code_verifier,
    grant_type,
  };
  const tokenResponse = await fetchJson(token_endpoint, {
    method: "POST",
    body: new URLSearchParams(tokenRequest),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  console.log(tokenResponse);
  const { access_token } = tokenResponse;
  return access_token;
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
