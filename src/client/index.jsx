import React from "react";
import ReactDOM from "react-dom";
import { useLoader } from "./useLoader";

function FrontPage() {
  const { data, error, loading } = useLoader(async () => {
    const res = await fetch("http://localhost:3000/api/user");
    if (!res.ok) {
      throw new Error("Res failed: " + res.status);
    }
    return await res.json();
  });

  if (error) {
    return <div>Error: {error.toString()}</div>;
  }
  if (loading || !data) {
    return <div>Loading...</div>;
  }

  return <h1>Hello there: {data.username}</h1>;
}

function Application() {
  return <FrontPage />;
}

ReactDOM.render(<Application />, document.getElementById("root"));
