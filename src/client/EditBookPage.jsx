import React, { useState } from "react";
import { useParams } from "react-router";
import { LoadingView } from "./LoadingView";
import { InputField } from "./InputField";
import { useLoading } from "./useLoading";
import { ErrorView } from "./ErrorView";

function EditBookForm({ book }) {
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [year, setYear] = useState(book.year);

  async function submit(e) {
    e.preventDefault();
    console.log("Submitting", { title, author, year });
    await fetch(`/api/books/${book.id}`, {
      method: "PUT",
      body: JSON.stringify({ title, author, year }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return (
    <form onSubmit={submit}>
      <h1>Edit an existing book ({title})</h1>
      <InputField label={"Title"} value={title} onChangeValue={setTitle} />
      <InputField label={"Author"} value={author} onChangeValue={setAuthor} />
      <InputField
        label={"Year"}
        value={year}
        onChangeValue={setYear}
        type="number"
      />
      <button>Submit</button>
    </form>
  );
}

export function EditBookPage({ bookApi }) {
  const { id } = useParams();

  const { data: book, loading, error, reload } = useLoading(
    async () => await bookApi.getBook(id),
    [id]
  );

  if (error) {
    return <ErrorView error={error} reload={reload()} />;
  }

  if (loading || !book) {
    return <LoadingView />;
  }

  return <EditBookForm book={book} />;
}
