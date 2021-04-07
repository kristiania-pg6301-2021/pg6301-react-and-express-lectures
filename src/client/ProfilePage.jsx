import React from "react";
import { ErrorView } from "./ErrorView";
import { LoadingView } from "./LoadingView";
import { useLoading } from "./useLoading";
import { fetchJson } from "./http";

export function ProfilePage() {
  const { loading, error, data } = useLoading(() =>
    fetchJson("https://webapps.kristiania.no:3000/api/profile", {
      method: "POST",
      body: JSON.stringify({}),
      headers: {
        "Content-Type": "application/json",
      },
    })
  );

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
