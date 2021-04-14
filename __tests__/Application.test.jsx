import { Application } from "../src/client/Application";
import * as ReactDOM from "react-dom";
import * as React from "react";

describe("application", () => {
  it("can show home page", async () => {
    const container = document.createElement("div");
    ReactDOM.render(<Application />, container);
    expect(container.innerHTML).toMatchSnapshot();
    expect(container.querySelector("h1").textContent).toEqual(
      "Book application"
    );
  });
});
