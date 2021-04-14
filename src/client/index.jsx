import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Link } from "react-router-dom";
import { Route, Switch } from "react-router";
import { BookListPage } from "./BookListPage";
import { CreateBookPage } from "./CreateBookPage";
import { EditBookPage } from "./EditBookPage";
import { fetchJSON, postJSON } from "./http";

function Application() {
  const bookApi = {
    listBooks: async () => await fetchJSON("/api/books"),
    getBook: async (id) => await fetchJSON(`/api/books/${id}`),
    createBook: async ({ title, author, year }) => {
      return postJSON("/api/books", {
        method: "POST",
        json: { title, author, year },
      });
    },
    updateBook: async (id, { title, author, year }) =>
      postJSON(`/api/books/${id}`, {
        method: "PUT",
        json: { title, author, year },
      }),
  };

  return (
    <BrowserRouter>
      <nav>
        <Link to={"/"}>Home</Link>
      </nav>
      <main>
        <Switch>
          <Route exact path={"/books"}>
            <BookListPage bookApi={bookApi} />
          </Route>
          <Route path={"/create"}>
            <CreateBookPage bookApi={bookApi} />
          </Route>
          <Route path={"/books/:id/edit"}>
            <EditBookPage bookApi={bookApi} />
          </Route>
          <Route exact path={"/"}>
            <h1>Book application</h1>
            <ul>
              <li>
                <Link to={"/books"}>List books</Link>
              </li>
              <li>
                <Link to={"/create"}>Add a book</Link>
              </li>
            </ul>
          </Route>
          <Route>Page not found</Route>
        </Switch>
      </main>
    </BrowserRouter>
  );
}

ReactDOM.render(<Application />, document.getElementById("root"));
