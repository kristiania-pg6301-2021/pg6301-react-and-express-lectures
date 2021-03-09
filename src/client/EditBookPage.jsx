import React, { useState, useEffect } from "react";
import { InputField } from "./InputField";
import { useLocation } from "react-router";

export function EditBookPage() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState(2021);

  const [loading, setLoading] = useState(true);

  const query = useLocation();
  useEffect(async () => {
    const id = new URLSearchParams(query.search).get("id");

    const res = await fetch(`/api/books/${id}`);
    const { title, author, year } = await res.json();
    setTitle(title);
    setAuthor(author);
    setYear(year);
    setLoading(false);
  }, [query]);

  async function handleSubmit(e) {
    const id = new URLSearchParams(query.search).get("id");
    e.preventDefault();
    await fetch(`/api/books/${id}`, {
      method: "PUT",
      body: JSON.stringify({ title, author, year }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1>Edit book</h1>
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
