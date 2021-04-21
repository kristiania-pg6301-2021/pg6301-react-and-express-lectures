import * as React from "react";
import { useEffect } from "react";
import { useHistory } from "react-router";

export function LoginCallbackPage({ onAccessToken }) {
  const hash = Object.fromEntries(
    new URLSearchParams(window.location.hash.substr(1))
  );

  const history = useHistory();

  useEffect(() => {
    const loginState = JSON.parse(sessionStorage.getItem("loginState"));
    const { access_token, state } = hash;

    if (state !== loginState.state) {
      alert("Why are you here?");
      return;
    }

    onAccessToken(access_token);
    // TODO: I'll keep this for now for debugging
    //sessionStorage.removeItem("loginState");
    history.push("/");
  }, [hash]);

  return <h1>Login callback</h1>;
}
