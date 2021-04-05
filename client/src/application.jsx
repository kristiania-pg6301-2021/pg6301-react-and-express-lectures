import React from "react";
import { LoginView } from "./loginView";
import { ErrorView } from "./errorView";
import { LoadingView } from "./loadingView";
import { useLoader } from "./useLoader";
import { QuizGamePage } from "./quizGamePage";

export function Application({ api }) {
  const { data, loading, error, reload } = useLoader(api.getUserinfo);

  if (error) {
    return <ErrorView error={error} reload={reload} />;
  }
  if (loading) {
    return <LoadingView />;
  }

  if (!data.user) {
    return <LoginView loginProvider={data.loginProvider} onLoggedIn={reload} />;
  }

  return (
    <div>
      <h1>Kristiania Quiz</h1>
      <div>Welcome {data.user.username}</div>
      <QuizGamePage api={api} />
    </div>
  );
}
