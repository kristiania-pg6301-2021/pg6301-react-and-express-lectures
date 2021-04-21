import { ChatView } from "../../src/client/ChatView";
import * as ReactDOM from "react-dom";
import * as React from "react";

describe("chat view", () => {
  it("shows chat log as messages", () => {
    const container = document.createElement("div");
    ReactDOM.render(
      <ChatView chatLog={["hello", "how are you doing?"]} />,
      container
    );
    expect(container).toMatchSnapshot();
    expect(container.querySelector("#chatLog div").textContent).toEqual(
      "hello"
    );
  });
});
