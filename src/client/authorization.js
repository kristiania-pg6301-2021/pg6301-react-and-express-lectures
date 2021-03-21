export async function sha256(text) {
  const binaryHash = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder("utf-8").encode(text)
  );
  return btoa(String.fromCharCode.apply(null, new Uint8Array(binaryHash)))
    .split("=")[0]
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

export function randomString(length) {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  let text = "";
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

export function useHashQuery() {
  if (!window.location.hash.length) {
    return {};
  } else {
    return Object.fromEntries(new URLSearchParams(location.hash.substr(1)));
  }
}

export function authorizationUrl(
  authorization_endpoint,
  {
    client_id,
    state,
    nonce,
    redirect_uri,
    scope = "openid profile",
    response_type = "code",
    response_mode = "fragment",
    code_challenge,
    code_challenge_method,
  }
) {
  const params = new URLSearchParams({
    client_id,
    scope,
    code_challenge_method,
    redirect_uri,
    response_type,
    response_mode,
    code_challenge,
    state,
    nonce,
  });
  return authorization_endpoint + "?" + params;
}

export async function fetchToken(
  token_endpoint = "https://login.microsoftonline.com/organizations/oauth2/v2.0/token",
  {
    client_id,
    redirect_uri,
    code_verifier,
    code,
    grant_type = "authorization_code",
  }
) {
  const res = await fetch(token_endpoint, {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id,
      redirect_uri,
      code_verifier,
      code,
      grant_type,
    }),
  });
  if (!res.ok) {
    console.error(res);
    throw new Error(e);
  }
  return await res.json();
}
