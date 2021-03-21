import { Link } from "react-router-dom";
import React from "react";

export function ErrorView({ error, reload }) {
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