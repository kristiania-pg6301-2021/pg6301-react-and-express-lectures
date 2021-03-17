import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Link } from "react-router-dom";
import { Route, Switch } from "react-router";
import { BookListPage } from "./BookListPage";
import { CreateBookPage } from "./CreateBookPage";
import { EditBookPage } from "./EditBookPage";

function Application() {
  const bookApi = {
    listBooks: async () => {
      const res = await fetch("/api/books");
      if (!res.ok) {
        throw new Error(
          `Something went wrong loading ${res.url}: ${res.statusText}`
        );
      }
      return await res.json();
    },
    getBook: async (id) => {
      const res = await fetch(`/api/books/${id}`);
      if (!res.ok) {
        throw new Error(
          `Something went wrong loading ${res.url}: ${res.statusText}`
        );
      }
      return await res.json();
    },
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
            <CreateBookPage />
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
