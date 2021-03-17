import {LoadingView} from "../src/client/LoadingView";
import TestRenderer from "react-test-renderer";

import React from "react";
import ReactDOM from "react-dom";
import  { act} from "react-dom/test-utils"
import {BookListPage} from "../src/client/BookListPage";

const bookApi = {
    listBooks: async () => [
        {id: 1, title: "Hakkebakkeskogen"}
    ]
};

describe("book list page", () => {
    it("show books", async () => {
        let view;
        await TestRenderer.act(async () => {
            view = TestRenderer.create(<BookListPage bookApi={bookApi} />)
        });
        expect(view.toJSON()).toMatchSnapshot();
        expect(view.root.findByType("li").children[0]).toEqual("Hakkebakkeskogen");
    });
    
    it("show books on dom", async () => {
        
        const container = document.createElement("div");
        document.body.appendChild(container);
        await act(async () => {
            ReactDOM.render(<BookListPage bookApi={bookApi} />, container)
        });

        expect(container.innerHTML).toMatchSnapshot();
        expect(container.querySelector("li").textContent)
            .toEqual("Hakkebakkeskogen");
    })
    
})