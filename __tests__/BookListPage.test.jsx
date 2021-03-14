import React from "react";
import ReactDOM from "react-dom";
import TestRenderer from "react-test-renderer";
import { act } from "react-dom/test-utils";
import { BookListPage } from "../src/client/BookListPage";
import { MemoryRouter } from "react-router";
import { Application } from "../src/client/Application";

class MockBookApi {
  async listBooks() {
    return [{ title: "Lord of the dance", id: 1 }];
  }
  async fetchBook() {
    return { title: "Lord of the dance", author: "Dummy", year: 2021, id: 1 };
  }
}

describe("book list view", () => {
  it("shows loading view", async () => {
    let view;
    await TestRenderer.act(async () => {
      view = TestRenderer.create(
        <MemoryRouter>
          <BookListPage bookApi={new MockBookApi()} />
        </MemoryRouter>
      );
    });
    expect(view.toJSON()).toMatchSnapshot();
    expect(view.root.findByType("a").children[0]).toEqual("Lord of the dance");
  });

  it("renders on real DOM", async () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    await act(async () => {
      ReactDOM.render(<Application bookApi={new MockBookApi()} />, container);
    });
    const listLink = container.querySelector("ul li a");
    expect(listLink.textContent).toEqual("List books");
    await act(async () => {
      listLink.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(container.innerHTML).toMatchSnapshot();
    const links = [...container.querySelectorAll("a")];
    const bookLink = links.find((a) => a.textContent === "Lord of the dance");
    await act(async () => {
      bookLink.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(container.innerHTML).toMatchSnapshot();
  });
});
