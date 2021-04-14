import React, { useState } from "react";
import { useHistory, useParams } from "react-router";
import { LoadingView } from "./LoadingView";
import { InputField } from "./InputField";
import { useLoading } from "./useLoading";
import { ErrorView } from "./ErrorView";

function EditBookForm({ onSubmit, book }) {
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [year, setYear] = useState(book.year);

  async function submit(e) {
    e.preventDefault();
    await onSubmit({ title, author, year });
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
  const history = useHistory();

  const { data: book, loading, error, reload } = useLoading(
    async () => await bookApi.getBook(id),
    [id]
  );

  async function handleSubmit({ title, author, year }) {
    await bookApi.updateBook(id, { title, author, year });
    history.push("/books");
  }

  if (error) {
    return <ErrorView error={error} reload={reload} />;
  }

  if (loading || !book) {
    return <LoadingView />;
  }

  return <EditBookForm onSubmit={handleSubmit} book={book} />;
}
