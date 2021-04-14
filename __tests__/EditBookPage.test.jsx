import { EditBookPage } from "../src/client/EditBookPage";
import * as ReactDOM from "react-dom";
import * as React from "react";
import { MemoryRouter } from "react-router";
import { act } from "react-dom/test-utils";

describe("edit book page", () => {
  it("can show information about an existing book", async () => {
    const getBook = () => ({
      author: "Kafka",
      title: "Prosessen",
      year: "1925",
    });
    const container = document.createElement("div");
    await act(async () => {
      await ReactDOM.render(
        <MemoryRouter>
          <EditBookPage bookApi={{ getBook }} />
        </MemoryRouter>,
        container
      );
    });
    expect(container.innerHTML).toMatchSnapshot();
    expect(container.querySelector("h1").textContent).toEqual(
      "Edit an existing book (Prosessen)"
    );
  });
});
