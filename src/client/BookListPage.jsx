import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export function BookListPage() {
  const [books, setBooks] = useState();
  const [error, setError] = useState();

  useEffect(loadBooks, []);

  async function loadBooks() {
    setError(undefined);
    try {
      const res = await fetch("/api/books");
      const books = await res.json();
      console.log(books);
      setBooks(books);
    } catch (e) {
      setError(e);
    }
  }

  if (error) {
    return (
      <>
        <h1>Failed to load books</h1>
        <div>{error.toString()}</div>
        <button onClick={loadBooks}>Try again</button>
      </>
    );
  }

  if (!books) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1>All books:</h1>
      {books.map((book) => (
        <div key={book.id}>
          <Link to={"/edit?id=" + book.id}>{book.title}</Link>
        </div>
      ))}
    </>
  );
}
