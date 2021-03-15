import React, { useEffect, useState } from "react";

function useLoader(loader, deps) {
  const [loading, setLoading] = useState();
  const [data, setData] = useState();
  const [error, setError] = useState();

  async function reload() {
    setLoading(true);
    setError(undefined);
    setData(undefined);
    try {
      setData(await loader());
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(reload, deps || []);

  return { loading, data, error, reload };
}

export function AccountPage() {
  const { loading, data, error } = useLoader(async () => {
    const res = await fetch("/api/account");
    if (!res.ok) {
      throw new Error("Failed to GET " + res.url + ": " + res.statusText);
    }
    return res.json();
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.toString()}</div>;
  }

  return (
    <>
      <h1>Account</h1>
      <div>You have ${data.account.balance}</div>
    </>
  );
}
