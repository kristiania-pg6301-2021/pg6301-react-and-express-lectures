import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

function useLoader(loadingFunction) {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  
  useEffect(async() => {
    setLoading(true);
    setData(undefined);
    setError(undefined);
    try {
      setData(await loadingFunction());
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, []);
  
  return {data, loading, error};
}

function ErrorView({error}) {
  return <div>Something went wrong: {error.toString()}</div>;
}

function LoadingView() {
  return <div>Loading...</div>;
}

function Application({loadProfile}) {
  const {data, loading, error} = useLoader(() => loadProfile());
  
  if (error) {
    return <ErrorView error={error} />;
  }
  if (loading || !data) {
    return <LoadingView />;
  }
  
  return <h1>Hello world</h1>;
}

async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`${url}: ${res.status} ${res.statusText}`);
  }
  return await res.json();
}

async function loadProfile() {
  return await fetchJSON("http://localhost:3000/api/profile");
}

ReactDOM.render(<Application loadProfile={loadProfile} />, document.getElementById("app"));
