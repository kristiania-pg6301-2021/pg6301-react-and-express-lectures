import React, {useEffect, useState} from "react";
import {HttpError} from "./HttpError";

function useLoader(loader, deps) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [error, setError] = useState();

  async function reload() {
    setLoading(true);
    setError(undefined);
    setData(undefined);
    try {
      setData(await loader());
    } catch (e) {
      console.log("error", e);
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
      throw new HttpError(res);
    }
    return res.json();
  });

  if (error) {
    return <div>
      Error: {error.toString()}
      {error.status === 401 && <div><a href="/login" target="_self"><button>Log in</button></a></div>}
    </div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1>Account for {data.user}</h1>
      <div>You have ${data.account.balance}</div>
    </>
  );
}
