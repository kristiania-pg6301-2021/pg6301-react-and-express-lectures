import React from "react";

export function ErrorView({ error, reload }) {
  return (
    <>
      <div>Something went wrong: {error.toString()}</div>
      {reload && <button onClick={reload}>Try again</button>}
    </>
  );
}
