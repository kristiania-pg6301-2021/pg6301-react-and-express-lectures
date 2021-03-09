import * as React from "react";

import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import {App} from "../../src/client/app";

let container: Element|undefined;
beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container!);
    container!.remove();
    container = undefined;
});



describe("application", () => {
    
    it("shows application home page", () => {
        act(() => {
            render(<App />, container!);
        });
        expect(container?.innerHTML).toMatchSnapshot();
    });
    
});
