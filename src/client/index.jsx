import React from "react";
import ReactDOM from "react-dom";
import { Application } from "./Application";
import { BookApi } from "./BookApi";

const bookApi = new BookApi();

ReactDOM.render(
  <Application bookApi={bookApi} />,
  document.getElementById("root")
);
