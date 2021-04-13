import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import { BookListPage } from "../src/client/BookListPage";
import { MemoryRouter } from "react-router";

const bookApi = {
  listBooks: async () => [{ id: 1, title: "Hakkebakkeskogen" }],
};

async function render(component) {
  const container = document.createElement("div");
  document.body.appendChild(container);
  await act(async () => {
    ReactDOM.render(<MemoryRouter>{component}</MemoryRouter>, container);
  });
  return container;
}

describe("book list page", () => {
  it("show books on dom", async () => {
    const container = await render(<BookListPage bookApi={bookApi} />);
    expect(container.innerHTML).toMatchSnapshot();
    expect(container.querySelector("li").textContent).toEqual(
      "Hakkebakkeskogen"
    );
  });

  it("shows book loading page", async () => {
    const listBooks = () => new Promise(() => {});
    const container = await render(<BookListPage bookApi={{ listBooks }} />);
    expect(container.innerHTML).toMatchSnapshot();
    expect(container.querySelector("div").textContent).toEqual("Loading ...");
  });

  it("shows book error page", async () => {
    const listBooks = async () => {
      throw Error("I don't like this");
    };
    const container = await render(<BookListPage bookApi={{ listBooks }} />);
    expect(container.innerHTML).toMatchSnapshot();
    expect(container.querySelector("div").textContent).toEqual(
      "Something went wrong: Error: I don't like this"
    );
  });
});
