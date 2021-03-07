import {act, Simulate} from "react-dom/test-utils";
import {render} from "react-dom";
import {container} from "./jest-setup";
import {MatchView} from "../src/match";

const React = require('react');
const {Match} = require("../src/match");

describe("Match", () => {
    const quiz = {
        question: "Are you happy?",
        alternatives: [
            "Yes", "No", "Maybe"
        ],
        answer: 2
    }
    
    it("renders quiz", ()=> {
        act(() => {
            render(<MatchView quiz={quiz} />, container);
        });

        expect(document.querySelector(".question").textContent).toEqual(quiz.question);
        expect([...document.querySelectorAll(".alternative")].map(e => e.textContent))
            .toEqual(quiz.alternatives);
    });

    test("answers quiz", () => {
        act(() => {
            render(<Match quizGenerator={() => quiz} />, container);
        });

        let msg = undefined;
        global.alert = (s) => {msg = s};
        Simulate.click(document.querySelector(".alternative"));
        expect(msg).toBe("Wrong! Try again!");
        Simulate.click(document.querySelectorAll(".alternative")[2]);
        expect(msg).toBe("Correct!");
    });
})
