import React from "react";
import ReactDOM from "react-dom";
import { Application } from "./Application";
import { BookApi } from "./BookApi";

ReactDOM.render(
  <Application bookApi={new BookApi()} />,
  document.getElementById("root")
);
