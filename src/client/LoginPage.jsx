import React, { useEffect, useState } from "react";
import { LoadingView } from "./LoadingView";
import { useHistory } from "react-router";
import {
  authorizationUrl,
  fetchAccessToken,
  randomString,
  sha256,
} from "./authorization";

export function LoginPage({ discovery_url, client_id, scope }) {
  const [errorObject, setErrorObject] = useState();
  const history = useHistory();

  async function redirectToLogin() {
    const code_verifier = randomString(50);
    sessionStorage.setItem("code_verifier", code_verifier);
    window.location.href = await authorizationUrl({
      discovery_url,
      client_id,
      scope,
      response_type: "code",
      response_mode: "fragment",
      code_challenge_method: "S256",
      code_challenge: await sha256(code_verifier),
    });
  }

  async function handleCallback() {
    let hash = Object.fromEntries(
      new URLSearchParams(window.location.hash.substr(1))
    );
    const { access_token, error, error_description, code } = hash;
    if (access_token) {
      localStorage.setItem("access_token", access_token);
      history.push("/");
    } else if (error) {
      setErrorObject({ error, error_description });
    } else if (code) {
      const code_verifier = sessionStorage.getItem("code_verifier");
      localStorage.setItem(
        "access_token",
        await fetchAccessToken({
          discovery_url,
          client_id,
          code,
          code_verifier,
        })
      );
      history.push("/");
    } else {
      console.warn("Unhandled hash", hash);
    }
  }

  useEffect(async function () {
    if (window.location.hash === "") {
      await redirectToLogin();
    } else {
      await handleCallback();
    }
  }, []);

  if (errorObject) {
    const { error, error_description } = errorObject;
    return (
      <div>
        <h1>An error occurred: {error}</h1>
        {error_description && <div>{error_description}</div>}
        <button onClick={redirectToLogin}>Try again</button>
      </div>
    );
  }

  if (window.location.hash !== "") {
    return <div>Handling callback</div>;
  }

  return <LoadingView />;
}
