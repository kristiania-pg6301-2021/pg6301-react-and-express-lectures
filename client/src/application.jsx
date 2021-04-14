import React from "react";
import { LoginView } from "./loginView";
import { ErrorView } from "./errorView";
import { LoadingView } from "./loadingView";
import { useLoader } from "./useLoader";
import { QuizGamePage } from "./quizGamePage";

export function Application({ api }) {
  return (
    <div>
      <h1>Kristiania Quiz</h1>
      <QuizGamePage api={api} />
    </div>
  );
}
