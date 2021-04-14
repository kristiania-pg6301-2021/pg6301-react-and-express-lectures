import { QuizGamePage } from "../src/quizGamePage";
import { MemoryRouter } from "react-router";
import * as ReactDOM from "react-dom";
import * as React from "react";
import { act } from "react-dom/test-utils";

describe("the quiz game page", () => {
  it("can display a starting page", async () => {
    const container = document.createElement("div");
    const fetchQuiz = () => ({
      state: "not_started",
    });
    await act(async () => {
      await ReactDOM.render(
        <MemoryRouter>
          <QuizGamePage api={{ fetchQuiz }} />
        </MemoryRouter>,
        container
      );
    });
    expect(container.innerHTML).toMatchSnapshot();
    expect(container.querySelector("button").textContent).toEqual("Start game");
  });
});
