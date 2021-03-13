import React from "react";
import ReactDOM from "react-dom";
import TestRenderer from "react-test-renderer";
import {act} from "react-dom/test-utils";
import {BookListPage} from "../src/client/BookListPage";
import {MemoryRouter} from "react-router";

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
            view = TestRenderer.create(<MemoryRouter><BookListPage bookApi={new MockBookApi()} /></MemoryRouter>);
        });
        expect(view.toJSON()).toMatchSnapshot();
        expect(view.root.findByType("a").children[0]).toEqual("Lord of the dance");
    });

    it("renders on real DOM", async () => {
        const container = document.createElement("div");
        document.body.appendChild(container);
        await act(async () => {
            ReactDOM.render(<MemoryRouter><BookListPage bookApi={new MockBookApi()} /></MemoryRouter>, container)
        });

        expect(container.innerHTML).toMatchSnapshot();
        expect(container.querySelector("li").textContent).toEqual("Lord of the dance");
    })
});
