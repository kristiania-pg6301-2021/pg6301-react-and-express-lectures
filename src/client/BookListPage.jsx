import React from "react";
import { LoadingView } from "./LoadingView";
import { Link } from "react-router-dom";
import { useLoading } from "./useLoading";
import { ErrorView } from "./ErrorView";

export function BookListPage({ bookApi }) {
  const { data: books, error, loading, reload } = useLoading(
    async () => await bookApi.listBooks()
  );

  if (error) {
    return <ErrorView error={error} reload={reload} />;
  }

  if (loading || !books) {
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
