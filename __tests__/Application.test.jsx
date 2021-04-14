import { Application } from "../src/client/Application";
import * as ReactDOM from "react-dom";
import * as React from "react";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";

describe("application", () => {
  it("can show home page", async () => {
    const container = document.createElement("div");
    ReactDOM.render(
      <MemoryRouter>
        <Application />
      </MemoryRouter>,
      container
    );
    expect(container.innerHTML).toMatchSnapshot();
    expect(container.querySelector("h1").textContent).toEqual(
      "Book application"
    );
  });

  it("can navigate to create book page", async () => {
    const container = document.createElement("div");
    await act(async () => {
      await ReactDOM.render(
        <MemoryRouter>
          <Application />
        </MemoryRouter>,
        container
      );
    });
    const createBookLink = [...container.querySelectorAll("a")].find(
      (a) => a.textContent === "Add a book"
    );
    await act(async () => {
      await createBookLink.dispatchEvent(
        new MouseEvent("click", { bubbles: true })
      );
    });
    expect(container.innerHTML).toMatchSnapshot();
    expect(container.querySelector("h1").textContent).toEqual(
      "Create new book"
    );
  });
});
