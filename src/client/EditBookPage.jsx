import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { LoadingView } from "./LoadingView";
import { InputField } from "./InputField";

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
  const [book, setBook] = useState();
  const [error, setError] = useState();

  const location = useLocation();

  async function loadBook() {
    try {
      let id = new URLSearchParams(location.search).get("id");
      console.log({ id });
      setBook(await bookApi.getBook(id));
    } catch (e) {
      setError(e);
    }
  }

  useEffect(loadBook, []);

  if (error) {
    return <div>Something went wrong: {error.toString()}</div>;
  }

  if (!book) {
    return <LoadingView />;
  }

  return <EditBookForm book={book} />;
}
