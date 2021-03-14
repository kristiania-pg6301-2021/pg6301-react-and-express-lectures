import React, { useState } from "react";
import { useLocation, useParams } from "react-router";
import { LoadingView } from "./LoadingView";
import { InputField } from "./InputField";
import { useLoader } from "./useLoader";

function EditBookForm({ book, onSubmit }) {
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [year, setYear] = useState(book.year);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({ title, author, year });
      }}
    >
      <h1>Edit book: {title}</h1>
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
  const { search } = useLocation();
  const params = useParams();
  console.log(params);

  const { error, data: book } = useLoader(() => {
    const id = new URLSearchParams(search).get("id");
    return bookApi.fetchBook(id);
  }, [search]);

  async function handleSubmit(book) {
    const id = new URLSearchParams(search).get("id");
    await bookApi.updateBook(id, book);
  }

  if (error) {
    return <div>An error occurred: {error.toString()}</div>;
  }
  if (!book) {
    return <LoadingView />;
  }

  return <EditBookForm book={book} onSubmit={handleSubmit} />;
}
