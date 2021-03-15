import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";

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

class HttpError extends Error {
  constructor(res) {
    super("Failed to access " + res.url + ": " + res.status + " " + res.statusText);
    this.status = res.status;
  }
  
  status() {
    return this.status;
  }

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
      {error.status === 401 && <div><Link to="/login"><button>Log in</button></Link></div>}
    </div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1>Account</h1>
      <div>You have ${data.account.balance}</div>
    </>
  );
}
