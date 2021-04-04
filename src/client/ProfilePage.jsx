import React from "react";
import { ErrorView } from "./ErrorView";
import { LoadingView } from "./LoadingView";
import { useLoading } from "./useLoading";
import { fetchJson } from "./http";

export function ProfilePage() {
  const { loading, error, data } = useLoading(() => {
    const access_token = localStorage.getItem("access_token");
    return fetchJson("https://webapps.kristiania.no:3000/api/profile", {
      method: "POST",
      data: JSON.stringify({ request: "get-profile" }),
      headers: {
        "Content-type": "application/json",
        ...(access_token ? { Authorization: `Bearer ${access_token}` } : {}),
      },
    });
  });

  if (error) {
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
