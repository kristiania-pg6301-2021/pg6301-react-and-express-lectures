import React from "react";
import { useLoader } from "./useLoader";
import { ErrorView } from "./errorView";
import { LoadingView } from "./loadingView";

export function QuizGame({ api }) {
  const { data, loading, error, reload } = useLoader(api.fetchQuiz);

  async function startGame() {
    await api.startQuiz();
    reload();
  }

  if (error) {
    return <ErrorView error={error} reload={reload} />;
  }
  if (loading) {
    return <LoadingView />;
  }

  if (data.state === "not_started") {
    return (
      <div>
        <div>Do you want to play a game?</div>
        <button onClick={startGame}>Start game</button>
      </div>
    );
  }

  return <div>Do you want to play a game?</div>;
}
