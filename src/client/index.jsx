import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

function useLoader(loadingFunction) {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  async function reload() {
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
  }

  useEffect(() => reload(), []);

  return { data, loading, error, reload };
}

function ErrorView({ error }) {
  return <div>Something went wrong: {error.toString()}</div>;
}

function LoadingView() {
  return <div>Loading...</div>;
}

function LoginView({ onLogin, loginProvider: { discoveryUrl, client_id, label } }) {
  const [authorizationUrl, setAuthorizationUrl] = useState();
  useEffect(async () => {
    const hash = Object.fromEntries(new URLSearchParams(window.location.hash.substr(1)));

    const { access_token } = hash;
    if (access_token) {
      window.location.hash = "";
      localStorage.setItem("access_token", access_token);
      return onLogin();
    }

    const { authorization_endpoint } = await fetchJSON(discoveryUrl);
    const parameters = new URLSearchParams({
      response_type: "token",
      scope: "openid email profile",
      client_id,
      redirect_uri: window.location.origin + "/oauth2callback"
    });
    setAuthorizationUrl(authorization_endpoint + "?" + parameters);
  }, [discoveryUrl]);


  return <div>
    <a href={authorizationUrl}>
      <button disabled={!authorizationUrl}>Log in with {label}</button>
    </a>
  </div>;
}

function Application({ loadProfile }) {
  const { data, loading, error, reload } = useLoader(() => loadProfile());

  if (error) {
    return <ErrorView error={error} />;
  }
  if (loading || !data) {
    return <LoadingView />;
  }

  const { userinfo } = data;

  if (userinfo) {
    return <div>Hello: {userinfo.name}</div>;
  } else {
    return <LoginView onLogin={reload} loginProvider={data.loginProvider} />;
  }
}

async function fetchJSON(url, options) {
  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error(`${url}: ${res.status} ${res.statusText}`);
  }
  return await res.json();
}

async function loadProfile() {
  return await fetchJSON("http://localhost:3000/api/profile", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`
      }
    }
  );
}

ReactDOM.render(<Application loadProfile={loadProfile} />, document.getElementById("app"));
