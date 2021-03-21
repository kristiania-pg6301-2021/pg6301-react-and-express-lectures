import React, { useEffect } from "react";
import {
  authorizationUrl,
  fetchToken,
  randomString,
  sha256,
  useHashQuery,
} from "./authorization";
import { useLoader } from "./useLoader";
import { fetchJson } from "./UserApi";

export function LoginView({
  onComplete,
  onError,
  discovery_url,
  client_id,
  scope,
}) {
  async function handleLogin() {
    const { authorization_endpoint } = data;
    const code_verifier = randomString(50);
    window.sessionStorage.setItem("code_verifier", code_verifier);
    const state = randomString(50);
    window.sessionStorage.setItem("state", state);
    window.location.href = authorizationUrl(authorization_endpoint, {
      client_id,
      scope,
      redirect_uri: window.location.origin,
      code_challenge: await sha256(code_verifier),
      code_challenge_method: "S256",
      state: state,
      nonce: randomString(30),
    });
  }

  async function handleCodeResponse(code) {
    const storedState = window.sessionStorage.getItem("state");
    if (state !== storedState) {
      console.error({ state, storedState });
      onError(
        "invalid state",
        "Redirect was provided with the wrong state value"
      );
      return;
    }
    const { token_endpoint } = data;
    const code_verifier = window.sessionStorage.getItem("code_verifier");
    const tokenResponse = await fetchToken(token_endpoint, {
      client_id,
      redirect_uri: window.location.origin,
      code_verifier,
      code,
    });
    window.sessionStorage.removeItem("code_verifier");
    window.sessionStorage.removeItem("state");
    return tokenResponse;
  }

  const { error, error_description, code, state } = useHashQuery();
  const { data, loading, error: discover_error } = useLoader(
    async () => await fetchJson(discovery_url, {})
  );

  useEffect(async () => {
    if (code && data) {
      onComplete(await handleCodeResponse(code));
    }
  }, [code, data]);

  useEffect(() => {
    if (error) {
      onError(error, error_description);
    }
  }, [error]);

  if (discover_error) {
    return <div>Discover error</div>;
  }
  if (loading || code || error) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1>Login with active directory</h1>
      <button onClick={handleLogin}>Log in</button>
    </>
  );
}
