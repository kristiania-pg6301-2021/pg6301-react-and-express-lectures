import React from "react";

export function ErrorView({ error }) {
  if (error.status === 401) {
    return (
      <div>
        You are not logged in{" "}
        <a href={"/login"} target={"_self"}>
          <button>Log in</button>
        </a>
      </div>
    );
  }
  return <div>An error occurred: {error.toString()}</div>;
}
