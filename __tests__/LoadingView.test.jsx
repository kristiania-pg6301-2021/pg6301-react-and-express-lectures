import React from "react";
import ReactDOM from "react-dom";
import TestRenderer from "react-test-renderer";
import {LoadingView} from "../src/client/LoadingView";
import {act} from "react-dom/test-utils";


describe("loading view", () => {
    it("shows loading view", () => {
        const view = TestRenderer.create(<LoadingView />);
        expect(view.toJSON()).toMatchSnapshot();
        expect(view.root.findByType("div").children).toEqual(["Loading ..."]);
    });
    
    it("renders on real DOM", () => {
        const container = document.createElement("div");
        document.body.appendChild(container);
        act(() => {
            ReactDOM.render(<LoadingView />, container)
        });
        
        expect(container.innerHTML).toMatchSnapshot();
        expect(container.querySelector("div").textContent).toEqual("Loading ...");
    })
});
