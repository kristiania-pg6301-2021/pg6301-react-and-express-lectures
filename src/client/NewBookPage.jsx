import React, { useState } from "react";

export function NewBookPage() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState(2021);

  async function handleSubmit(e) {
    e.preventDefault();
    const book = { title, author, year };
    console.log(book);
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
        <div>
          <label>
            Title:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Author:
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Year:
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </label>
        </div>
        <div>
          <button>Save</button>
        </div>
      </form>
    </>
  );
}
