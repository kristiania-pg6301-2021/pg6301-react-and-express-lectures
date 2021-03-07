import {act, Simulate} from "react-dom/test-utils";
import {render} from "react-dom";
import {container} from "./jest-setup";

const React = require('react');
const {Match} = require("../src/match");

describe("Match", () => {
    it("renders quiz", ()=> {
        act(() => {
            render(<Match />, container);
        });

        expect(document.querySelector(".question").textContent).toBeDefined();
        expect(document.querySelectorAll(".alternative")).toHaveLength(4);
    });

    test("answers quiz", () => {
        act(() => {
            render(<Match />, container);
        });

        let msg = undefined;
        global.alert = (s) => {msg = s};
        Simulate.click(document.querySelector(".alternative"));
        expect(msg).toBeDefined();
    });
})
