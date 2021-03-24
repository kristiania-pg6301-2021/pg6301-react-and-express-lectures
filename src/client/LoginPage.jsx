import React, { useState } from "react";
import { postJson } from "./http";
import { useHistory } from "react-router";
import { useSubmit } from "./useSubmit";
import { InputField } from "./InputField";

export function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const { handleSubmit: handleLogin, submitting, error } = useSubmit(
    async () => {
      await postJson("/api/login", { username, password });
    },
    () => history.push("/")
  );

  return (
    <div>
      <h1>Please log in</h1>
      <form onSubmit={handleLogin}>
        {submitting && <div>Please wait</div>}
        {error && <div>Error: {error.toString()}</div>}
        <InputField
          label={"Username"}
          value={username}
          onValueChange={setUsername}
        />
        <InputField
          label={"Password"}
          type="password"
          value={password}
          onValueChange={setPassword}
        />
        <button disabled={submitting}>Log in</button>
      </form>
    </div>
  );
}
