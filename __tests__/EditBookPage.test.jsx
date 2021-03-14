import React from "react";
import ReactDOM from "react-dom";
import TestRenderer from "react-test-renderer";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router";
import { EditBookPage } from "../src/client/EditBookPage";

class MockBookApi {
  async fetchBook(id) {
    return { title: `Book ${id}`, author: "Dummy", year: 2021, id: 1 };
  }
}

describe("edit book view", () => {
  it("test renders view", async () => {
    let view;
    await TestRenderer.act(async () => {
      view = TestRenderer.create(
        <MemoryRouter initialEntries={["/edit?id=12"]}>
          <EditBookPage bookApi={new MockBookApi()} />
        </MemoryRouter>
      );
    });
    expect(view.toJSON()).toMatchSnapshot();
    expect(view.root.findByType("h1").children.join("")).toEqual(
      "Edit book: Book 12"
    );
  });

  it("renders on real DOM", async () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    await act(async () => {
      ReactDOM.render(
        <MemoryRouter initialEntries={["/edit?id=12"]}>
          <EditBookPage bookApi={new MockBookApi()} />
        </MemoryRouter>,
        container
      );
    });
    expect(container.innerHTML).toMatchSnapshot();
    expect(container.querySelector("h1").textContent).toEqual(
      "Edit book: Book 12"
    );
  });
});
