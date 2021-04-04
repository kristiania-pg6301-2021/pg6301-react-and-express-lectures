import React from "react";

export function ErrorView({ error, reload }) {
  return (
    <div>
      <h1>An error occurred</h1>
      <div>{error.toString()}</div>
      <button onClick={reload}>Retry</button>
    </div>
  );
}