import React from "react";

export function ErrorView({ error }) {
  return <div>An error occurred: {error.toString()}</div>;
}
