import React from "react";
import ReactDOM from "react-dom";
import { fetchJSON, postJSON } from "./http";
import { Application } from "./Application";

const bookApi = {
  listBooks: async () => await fetchJSON("/api/books"),
  getBook: async (id) => await fetchJSON(`/api/books/${id}`),
  createBook: async ({ title, author, year }) =>
    await postJSON("/api/books", { title, author, year }),
  updateBook: async (id, { title, author, year }) =>
    await postJSON(`/api/books/${id}`, { title, author, year }, "PUT"),
};

ReactDOM.render(
  <Application bookApi={bookApi} />,
  document.getElementById("root")
);
