import { ChatView } from "../../src/client/ChatPage";
import * as ReactDOM from "react-dom";
import * as React from "react";

describe("chat view", () => {
  it("can show existing chat messages", async () => {
    const chatLog = [
      {
        id: "1",
        username: "User 1",
        message: "Hello",
      },
      {
        id: "2",
        username: "User 2",
        message: "Welcome, User 1",
      },
    ];

    const container = document.createElement("div");
    ReactDOM.render(
      <ChatView
        chatLog={chatLog}
        username={"Myself"}
        onSendMessage={jest.fn()}
      />,
      container
    );

    expect(container.querySelector(".chatLog .message").textContent).toEqual(
      "User 1: Hello"
    );
    expect(container).toMatchSnapshot();
  });
});
