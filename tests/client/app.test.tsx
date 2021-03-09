import * as React from "react";

import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import {App, QuizPage} from "../../src/client/app";

import pretty from "pretty";

let container: HTMLElement;
beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container!);
    container.remove();
});


describe("application", () => {
    
    it("shows application home page", () => {
        act(() => {
            render(<App quizFactory={jest.fn()} />, container);
        });
        expect(pretty(container.innerHTML)).toMatchSnapshot();
    });
    
    it("shows quiz", async () => {
        const quiz = {
            question: "Huh?", alternatives: ["yeah", "nah!"]
        };
        await act(async () => {
            render(<QuizPage quizFactory={() => Promise.resolve(quiz)} />, container);
        });
        expect(pretty(container.innerHTML)).toMatchSnapshot();
        expect(container.querySelector("h1")!.textContent).toEqual("Quiz");
    });
    
    it("shows loading page", () => {
        act(() => {
            render(<QuizPage quizFactory={() => new Promise(jest.fn())} />, container);
        });
        expect(pretty(container.innerHTML)).toMatchSnapshot();
        expect(container.querySelector("h1")!.textContent).toEqual("Loading");
    })
    
});
