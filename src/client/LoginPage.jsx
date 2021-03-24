import React, { useState } from "react";
import { postJson } from "./http";
import { useHistory } from "react-router";

function InputField({ value, onValueChange, type = "text", label }) {
  return (
    <div>
      <label>
        {label}:{" "}
        <input
          type={type}
          value={value}
          onChange={(e) => onValueChange(e.target.value)}
        />
      </label>
    </div>
  );
}

function useSubmit(submitFunction, onSubmitSuccess) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState();

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError(undefined);
    try {
      await submitFunction();
      onSubmitSuccess();
    } catch (e) {
      setError(e);
    } finally {
      setSubmitting(false);
    }
  }

  return { handleSubmit, submitting, error };
}

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
