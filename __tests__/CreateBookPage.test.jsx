import React from "react";
import ReactDOM from "react-dom";
import TestRenderer from "react-test-renderer";
import { act, Simulate } from "react-dom/test-utils";
import { MemoryRouter } from "react-router";
import { CreateBookPage } from "../src/client/CreateBookPage";

function findInputByLabel(form, label) {
  const titleLabel = [...form.querySelectorAll("label")].find((l) =>
    l.textContent.startsWith(label)
  );
  return titleLabel.querySelector("input");
}

function changeValue(input, value) {
  Simulate.change(input, { target: { value } });
}

describe("create book view", () => {
  it("test renders view", async () => {
    const saveBook = jest.fn();
    let view;
    await TestRenderer.act(async () => {
      view = TestRenderer.create(
        <MemoryRouter>
          <CreateBookPage bookApi={{ saveBook }} />
        </MemoryRouter>
      );
    });
    expect(view.toJSON()).toMatchSnapshot();
    expect(view.root.findByType("h1").children.join("")).toEqual(
      "Create new book"
    );
  });

  it("renders on real DOM", async () => {
    const saveBook = jest.fn();
    const container = document.createElement("div");
    document.body.appendChild(container);
    await act(async () => {
      ReactDOM.render(
        <MemoryRouter>
          <CreateBookPage bookApi={{ saveBook }} />
        </MemoryRouter>,
        container
      );
    });
    expect(container.innerHTML).toMatchSnapshot();
    expect(container.querySelector("h1").textContent).toEqual(
      "Create new book"
    );

    await act(async () => {
      const form = container.querySelector("form");
      await changeValue(findInputByLabel(form, "Title"), "MyBook");
      await changeValue(findInputByLabel(form, "Author"), "Author");
      await changeValue(findInputByLabel(form, "Year"), "2021");
      Simulate.submit(form);
    });
    expect(saveBook).toBeCalledWith({
      title: "MyBook",
      author: "Author",
      year: "2021",
    });
  });
});
