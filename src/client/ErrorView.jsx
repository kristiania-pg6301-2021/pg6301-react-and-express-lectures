import * as React from "react";

export function ErrorView(props) {
  return (
    <div>
      <h1>An error occurred</h1>
      <div>{props.error.toString()}</div>
    </div>
  );
}