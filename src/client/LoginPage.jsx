import React, { useEffect, useState } from "react";
import { fetchJson } from "./http";
import { LoadingView } from "./LoadingView";
import { useHistory } from "react-router";

async function authorizationUrl({
  discovery_url,
  client_id,
  scope,
  response_type = "token",
}) {
  const { authorization_endpoint } = await fetchJson(discovery_url);
  const params = new URLSearchParams({
    response_type,
    redirect_uri: window.location.href.split("#")[0],
    client_id,
    scope,
  });
  return authorization_endpoint + "?" + params;
}

export function LoginPage({ discovery_url, client_id, scope }) {
  const [errorObject, setErrorObject] = useState();
  const history = useHistory();

  async function redirectToLogin() {
    window.location.href = await authorizationUrl({
      discovery_url,
      client_id,
      scope,
    });
  }

  function handleCallback() {
    let hash = Object.fromEntries(
      new URLSearchParams(window.location.hash.substr(1))
    );
    const { access_token, error, error_description } = hash;
    if (access_token) {
      localStorage.setItem("access_token", access_token);
      history.push("/");
    } else if (error) {
      setErrorObject({ error, error_description });
    } else {
      console.warn("Unhandled hash", hash);
    }
  }

  useEffect(async function () {
    if (window.location.hash === "") {
      await redirectToLogin();
    } else {
      handleCallback();
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
