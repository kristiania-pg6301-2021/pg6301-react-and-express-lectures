import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import { BookListPage } from "../src/client/BookListPage";
import { MemoryRouter } from "react-router";

const bookApi = {
  listBooks: async () => [{ id: 1, title: "Hakkebakkeskogen" }],
};

describe("book list page", () => {
  it("show books on dom", async () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    await act(async () => {
      ReactDOM.render(
        <MemoryRouter>
          <BookListPage bookApi={bookApi} />
        </MemoryRouter>,
        container
      );
    });

    expect(container.innerHTML).toMatchSnapshot();
    expect(container.querySelector("li").textContent).toEqual(
      "Hakkebakkeskogen"
    );
  });
});
