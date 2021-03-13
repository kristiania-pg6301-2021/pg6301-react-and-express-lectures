import React from "react";
import TestRenderer from "react-test-renderer";
import {LoadingView} from "../src/client/LoadingView";


describe("loading view", () => {
    it("shows loading view", () => {
        const view = TestRenderer.create(<LoadingView />);
        expect(view.toJSON()).toMatchSnapshot();
    });
});
