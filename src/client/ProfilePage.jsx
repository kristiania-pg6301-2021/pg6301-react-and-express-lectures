import React from "react";
import { ErrorView } from "./ErrorView";
import { LoadingView } from "./LoadingView";
import { useLoader } from "./lib/useLoader";
import { fetchJson } from "./lib/http";

export function ProfilePage() {
  const { data, error, loading, reload } = useLoader(() =>
    fetchJson("/api/profile")
  );

  if (loading) {
    return <LoadingView />;
  }
  if (error) {
    return <ErrorView error={error} reload={reload} />;
  }

  return (
    <div>
      <h1>My profile</h1>
      <div>{JSON.stringify(data)}</div>
    </div>
  );
}
