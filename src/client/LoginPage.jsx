import React, { useState } from "react";
import { useHistory } from "react-router";
import { postJson } from "./lib/http";
import { InputField } from "./InputField";

function useSubmit({ submit, onComplete }) {
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState();
  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(undefined);
    try {
      onComplete(await submit());
    } catch (e) {
      console.error(e);
      setSubmitError(e);
    } finally {
      setSubmitting(false);
    }
  }

  return { handleSubmit, submitting, submitError };
}

export function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const { handleSubmit, submitting, submitError } = useSubmit({
    submit: () => postJson("/api/login", { username, password }),
    onComplete: () => history.push("/"),
  });

  return (
    <form onSubmit={handleSubmit}>
      <fieldset disabled={submitting}>
        <h1>Login here</h1>
        {submitError && <div>An error occurred: {submitError.toString()}</div>}
        <InputField
          label={"Username"}
          value={username}
          onValueChange={setUsername}
        />
        <InputField
          label={"Password"}
          value={password}
          onValueChange={setPassword}
          type={"password"}
        />
        <div>
          <button>Log in</button>
        </div>
      </fieldset>
    </form>
  );
}
