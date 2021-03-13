import React from "react";
import ReactDOM from "react-dom";
import TestRenderer from "react-test-renderer";
import {act} from "react-dom/test-utils";
import {BookListPage} from "../src/client/BookListPage";

class MockBookApi {
    async listBooks() {
        return [
            {title: "Lord of the dance", id: 1}
        ]
    }
}


describe("book list view", () => {
    it("shows loading view", async () => {
        let view;
        await TestRenderer.act(async () => {
            view = TestRenderer.create(<BookListPage bookApi={new MockBookApi()} />);
        });
        expect(view.toJSON()).toMatchSnapshot();
        expect(view.root.findByType("li").children[0]).toEqual("Lord of the dance");
    });

    it("renders on real DOM", async () => {
        const container = document.createElement("div");
        document.body.appendChild(container);
        await act(async () => {
            ReactDOM.render(<BookListPage bookApi={new MockBookApi()} />, container)
        });

        expect(container.innerHTML).toMatchSnapshot();
        expect(container.querySelector("li").textContent).toEqual("Lord of the dance");
    })
});
