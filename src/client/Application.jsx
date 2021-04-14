import { Link } from "react-router-dom";
import { Route, Switch } from "react-router";
import { BookListPage } from "./BookListPage";
import { CreateBookPage } from "./CreateBookPage";
import { EditBookPage } from "./EditBookPage";
import React from "react";

export function Application({ bookApi }) {
  return (
    <>
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
    </>
  );
}
