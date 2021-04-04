import React from "react";
import ReactDOM from "react-dom";
import { Application } from "./application";
import { QuizApplicationApi } from "./quizApplicationApi";

ReactDOM.render(
  <Application api={new QuizApplicationApi()} />,
  document.getElementById("app")
);
