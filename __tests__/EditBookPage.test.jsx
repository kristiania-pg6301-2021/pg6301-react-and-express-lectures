import { EditBookPage } from "../src/client/EditBookPage";
import * as ReactDOM from "react-dom";
import * as React from "react";
import { MemoryRouter } from "react-router";
import { act } from "react-dom/test-utils";

async function renderForTest(child) {
  const container = document.createElement("div");
  await act(async () => {
    await ReactDOM.render(<MemoryRouter>{child}</MemoryRouter>, container);
  });
  return container;
}

describe("edit book page", () => {
  it("can show information about an existing book", async () => {
    const getBook = () => ({
      author: "Kafka",
      title: "Prosessen",
      year: "1925",
    });
    const container = await renderForTest(
      <EditBookPage bookApi={{ getBook }} />
    );
    expect(container.innerHTML).toMatchSnapshot();
    expect(container.querySelector("h1").textContent).toEqual(
      "Edit an existing book (Prosessen)"
    );
  });

  it("can show loading screen", async () => {
    const getBook = () => new Promise((resolve) => {});
    const container = await renderForTest(
      <EditBookPage bookApi={{ getBook }} />
    );
    expect(container.innerHTML).toMatchSnapshot();
    expect(container.querySelector("div").textContent).toEqual("Loading ...");
  });

  it("can show error message", async () => {
    const getBook = () => {
      throw new Error("Failed to load");
    };
    const container = await renderForTest(
      <EditBookPage bookApi={{ getBook }} />
    );
    expect(container.innerHTML).toMatchSnapshot();
    expect(container.querySelector("div").textContent).toEqual(
      "Something went wrong: Error: Failed to load"
    );
  });
});
