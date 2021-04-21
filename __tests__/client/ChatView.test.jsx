import { ChatView } from "../../src/client/ChatView";
import * as ReactDOM from "react-dom";
import * as React from "react";
import { Simulate } from "react-dom/test-utils";

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

  it("submits a new chat message", () => {
    const container = document.createElement("div");
    const onSendMessage = jest.fn();
    ReactDOM.render(
      <ChatView chatLog={[]} onSendMessage={onSendMessage} />,
      container
    );

    Simulate.change(container.querySelector("input"), {
      target: { value: "Hello World" },
    });
    Simulate.submit(container.querySelector("form"));

    expect(onSendMessage).toBeCalledWith("Hello World");
  });
});
