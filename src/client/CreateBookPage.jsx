import React, { useState } from "react";
import { InputField } from "./InputField";

export function CreateBookPage({ bookApi }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");

  async function submit(e) {
    e.preventDefault();
    await bookApi.saveBook({ title, author, year });
  }

  return (
    <form onSubmit={submit}>
      <h1>Create new book</h1>
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
