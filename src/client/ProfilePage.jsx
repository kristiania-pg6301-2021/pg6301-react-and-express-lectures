import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

class HttpError extends Error {
  constructor(url, res) {
    super(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
    this.status = res.status;
  }
}

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new HttpError(url, res);
  }
  return await res.json();
}

function useLoader(loadingFunction) {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  async function reload() {
    setData(undefined);
    setLoading(true);
    setError(undefined);
    try {
      setData(await loadingFunction());
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(reload, []);

  return { data, error, loading, reload };
}

function LoadingView() {
  return <div>Loading...</div>;
}

function ErrorView({ error, reload }) {
  if (error.status === 401) {
    return (
      <div>
        <div>Unauthorized</div>
        {error.status === 401 && (
          <Link to={"/login"}>
            <button>Log in</button>
          </Link>
        )}
      </div>
    );
  }
  return (
    <div>
      <div>Error: {error.toString()}</div>
      <div>
        <button onClick={reload}>Try again</button>
      </div>
    </div>
  );
}

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
