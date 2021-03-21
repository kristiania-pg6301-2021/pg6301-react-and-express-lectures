import React from "react";

export function ErrorView({ error, reload }) {
  if (error.status === 401) {
    return (
      <div>
        <div>Unauthorized</div>
        {error.status === 401 && (
          <a href={"/login"} target="_self">
            <button>Log in</button>
          </a>
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
