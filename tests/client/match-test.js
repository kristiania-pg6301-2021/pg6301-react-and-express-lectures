import {act, Simulate} from "react-dom/test-utils";
import {render} from "react-dom";
import {container} from "./react-setup";
import {BrowserRouter} from "react-router-dom";

const React = require('react');
const {Match} = require("../../src/client/match");

describe("Match", () => {
    const quiz = {
        question: "Are you happy?",
        alternatives: [
            "Yes", "No", "Maybe"
        ],
        answer: 2
    }
    
    beforeEach(() => {
        act(() => {
            render(<BrowserRouter>
                <Match quizGenerator={() => quiz} />
            </BrowserRouter>, container);
        });
    });
    
    it("renders quiz", ()=> {
        expect(document.querySelector(".question").textContent).toEqual(quiz.question);
        expect([...document.querySelectorAll(".alternative")].map(e => e.textContent))
            .toEqual(quiz.alternatives);
    });

    test("answers quiz incorrectly", () => {
        Simulate.click(document.querySelector(".alternative"));
        expect(document.querySelector("h1").textContent).toEqual("You lost!");
    });

    test("answers quiz correctly", () => {
        Simulate.click(document.querySelectorAll(".alternative")[2]);
        expect(document.querySelector("h1").textContent).toEqual("You won!");
    });
})
