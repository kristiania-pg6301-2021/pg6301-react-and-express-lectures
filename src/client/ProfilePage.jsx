import React, { useEffect, useState } from "react";
import { ErrorView } from "./ErrorView";
import { LoadingView } from "./LoadingView";
import { useLoading } from "./useLoading";
import { fetchJson } from "./http";

export function ProfilePage() {
  const [authorizationUrl, setAuthorizationUrl] = useState();

  const { loading, error, data } = useLoading(() => {
    const access_token = localStorage.getItem("access_token");
    return fetchJson("https://webapps.kristiania.no:3000/api/profile", {
      method: "POST",
      body: JSON.stringify({}),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });
  });

  useEffect(async () => {
    const { authorization_endpoint } = await fetchJson(
      "https://accounts.google.com/.well-known/openid-configuration"
    );
    const query = new URLSearchParams({
      response_type: "token",
      scope: "openid profile email",
      client_id:
        "89654971890-sc10avhkormbba0dcii3uu66n3bg00ks.apps.googleusercontent.com",
      redirect_uri: window.location.origin + "/oauth2callback",
    });
    setAuthorizationUrl(authorization_endpoint + "?" + query);
  }, []);

  if (error) {
    if (error.status === 401) {
      return (
        <div>
          <a href={authorizationUrl} target={"_self"}>
            <button>Login</button>
          </a>
        </div>
      );
    }
    return <ErrorView error={error} />;
  }
  if (loading || !data) {
    return <LoadingView />;
  }

  const { username } = data;

  return (
    <div>
      <h1>Your profile:</h1>
      <div>Username: {username}</div>
    </div>
  );
}
