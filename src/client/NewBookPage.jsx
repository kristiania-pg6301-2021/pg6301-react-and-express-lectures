import React, { useState } from "react";
import { InputField } from "./InputField";

export function NewBookPage() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState(2021);

  async function handleSubmit(e) {
    e.preventDefault();
    const book = { title, author, year };
    await fetch("/api/books", {
      method: "POST",
      body: JSON.stringify(book),
      headers: { "content-type": "application/json" },
    });
  }

  return (
    <>
      <h1>Add a new book</h1>
      <form onSubmit={handleSubmit}>
        <InputField label={"Title"} value={title} onChangeValue={setTitle} />
        <InputField label={"Author"} value={author} onChangeValue={setAuthor} />
        <InputField
          label={"Year"}
          value={year}
          onChangeValue={setYear}
          type="number"
        />
        <div>
          <button>Save</button>
        </div>
      </form>
    </>
  );
}
