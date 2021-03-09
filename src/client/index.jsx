import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter, Link } from "react-router-dom";
import { Route, Switch } from "react-router";
import { BookListPage } from "./BookListPage";

function HomePage() {
  return (
    <>
      <h1>Welcome to my book application</h1>
      <ul>
        <li>
          <Link to="/books">List books</Link>
        </li>
        <li>
          <Link to="/create">Create new book</Link>
        </li>
      </ul>
    </>
  );
}

function NewBookPage() {
  return <h1>Add a new book</h1>;
}

function EditBookPage() {
  return <h1>Edit book</h1>;
}

function Application() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/create">
          <NewBookPage />
        </Route>
        <Route path="/edit">
          <EditBookPage />
        </Route>
        <Route path="/books">
          <BookListPage />
        </Route>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route>
          <h1>Not found</h1>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

ReactDOM.render(<Application />, document.getElementById("app"));
