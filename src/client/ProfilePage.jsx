import * as React from "react";
import { useEffect, useState } from "react";
import { fetchJSON } from "./http";
import { ErrorView } from "./ErrorView";

export function ProfilePage() {
  const [profile, setProfile] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    try {
      setProfile(await fetchJSON("http://localhost:3000/api/profile"));
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, []);

  if (error) {
    return <ErrorView error={error} />;
  }
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1>Profile page</h1>
      <div>{profile.message}</div>
    </>
  );
}