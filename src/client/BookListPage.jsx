import React, { useState, useEffect } from "react";
import { LoadingView } from "./LoadingView";
import { Link } from "react-router-dom";
import { useLoader } from "./useLoader";

export function BookListPage({ bookApi }) {
  const { error, data: books } = useLoader(() => bookApi.listBooks(), []);

  if (error) {
    return <div>Something went wrong: {error.toString()}</div>;
  }

  if (!books) {
    return <LoadingView />;
  }

  return (
    <>
      <h1>List books</h1>
      {books.map(({ id, title }) => (
        <li key={id}>
          <Link to={`/books/${id}/edit`}>{title}</Link>
        </li>
      ))}
    </>
  );
}
