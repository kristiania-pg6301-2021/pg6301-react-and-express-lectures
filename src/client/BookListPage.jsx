import React from "react";
import { LoadingView } from "./LoadingView";
import { Link } from "react-router-dom";
import { useLoading } from "./useLoading";
import { ErrorView } from "./ErrorView";

export function BookListPage({ bookApi }) {
  const { error, loading, data, reload } = useLoading(async () =>
    bookApi.listBooks()
  );

  if (error) {
    return <ErrorView error={error} reload={reload} />;
  }

  if (loading || !data) {
    return <LoadingView />;
  }

  return (
    <>
      <h1>List books</h1>
      {data.map(({ id, title }) => (
        <li key={id}>
          <Link to={`/edit?id=${id}`}>{title}</Link>
        </li>
      ))}
    </>
  );
}
