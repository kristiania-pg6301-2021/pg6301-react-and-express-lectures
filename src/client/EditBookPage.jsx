import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { LoadingView } from "./LoadingView";
import { InputField } from "./InputField";

export function EditBookPage({ bookApi }) {
  const { search } = useLocation();
  const [book, setBook] = useState();
  const [error, setError] = useState();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");

  useEffect(async () => {
    try {
      const id = new URLSearchParams(search).get("id");
      let book = await bookApi.fetchBook(id);
      setBook(book);
      setTitle(book.title);
      setAuthor(book.author);
      setYear(book.year);
    } catch (e) {
      setError(e);
    }
  }, [search]);

  async function handleSubmit(e) {
    e.preventDefault();
    const id = new URLSearchParams(search).get("id");
    await bookApi.updateBook(id, { title, author, year });
  }

  if (error) {
    return <div>An error occurred: {error.toString()}</div>;
  }
  if (!book) {
    return <LoadingView />;
  }

  return (
    <form onSubmit={handleSubmit}>
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
