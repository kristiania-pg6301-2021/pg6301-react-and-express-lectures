import React from "react";
import ReactDOM from "react-dom";
import { useLoader } from "./useLoader";

function FrontPage() {
  const { data, error, loading } = useLoader(
    () =>
      new Promise((resolve) => {
        setTimeout(() => resolve({ username: "Johannes" }), 500);
      })
  );

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
