import React, { useState, useEffect } from "react";
import { LoadingView } from "./LoadingView";
import { Link } from "react-router-dom";

export function BookListPage({ bookApi }) {
  const [books, setBooks] = useState();
  const [error, setError] = useState();

  async function loadBooks() {
    try {
      setBooks(await bookApi.listBooks());
    } catch (e) {
      setError(e);
    }
  }

  useEffect(loadBooks, []);

  if (error) {
    return <div>Something went wrong</div>;
  }

  if (!books) {
    return <LoadingView />;
  }

  return (
    <>
      <h1>List books</h1>
      {books.map(({ id, title }) => (
        <li key={id}>
          <Link to={`/edit?id=${id}`}>{title}</Link>
        </li>
      ))}
    </>
  );
}
