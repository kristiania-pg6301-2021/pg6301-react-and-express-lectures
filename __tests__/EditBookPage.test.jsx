import { EditBookPage } from "../src/client/EditBookPage";
import { act, Simulate } from "react-dom/test-utils";
import * as ReactDOM from "react-dom";
import * as React from "react";
import { MemoryRouter, Route } from "react-router";

async function render(component, url = "/books/12/edit") {
  const container = document.createElement("div");
  await act(async () => {
    await ReactDOM.render(
      <MemoryRouter initialEntries={[url]}>
        <Route path={"/books/:id/edit"}>{component}</Route>
      </MemoryRouter>,
      container
    );
  });
  return container;
}

describe("book edit page", function () {
  it("loads book", async () => {
    const getBook = () => ({
      title: "My Book",
      author: "Firstname Lastname",
      year: 1999,
    });
    const container = await render(<EditBookPage bookApi={{ getBook }} />);
    expect(container.innerHTML).toMatchSnapshot();
  });

  it("shows book loading failure", async () => {
    const getBook = async () => {
      throw new Error("Not found");
    };
    const container = await render(<EditBookPage bookApi={{ getBook }} />);
    expect(container.innerHTML).toMatchSnapshot();
  });

  it("updates book on save", async () => {
    const getBook = () => ({
      title: "My Book",
      author: "Firstname Lastname",
      year: 1999,
    });
    const updateBook = jest.fn();
    const container = await render(
      <EditBookPage bookApi={{ getBook, updateBook }} />
    );

    Simulate.change(container.querySelector("input"), {
      target: {
        value: "New Value",
      },
    });
    Simulate.submit(container.querySelector("form"));
    expect(updateBook).toHaveBeenCalledWith("12", {
      title: "New Value",
      author: "Firstname Lastname",
      year: 1999,
    });
  });
});
