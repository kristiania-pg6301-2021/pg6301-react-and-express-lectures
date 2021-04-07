import React, { useEffect } from "react";
import { useHistory } from "react-router";

export function AuthorizationCallback() {
  let history = useHistory();
  useEffect(() => {
    const { access_token } = Object.fromEntries(
      new URLSearchParams(window.location.hash.substr(1))
    );
    localStorage.setItem("access_token", access_token);
    history.push("/");
  }, []);
  return <div>Callback....</div>;
}
