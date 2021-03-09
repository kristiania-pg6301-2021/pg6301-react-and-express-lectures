import * as React from "react";

import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import {App} from "../../src/client/app";

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
            render(<App />, container);
        });
        expect(pretty(container.innerHTML)).toMatchSnapshot();
    });
    
});
