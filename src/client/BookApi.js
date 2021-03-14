export class BookApi {
  async saveBook(book) {
    console.log("Submitting", book);
    await fetch("/api/books", {
      method: "POST",
      body: JSON.stringify(book),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async updateBook(id, book) {
    await fetch(`/api/books/${id}`, {
      method: "PUT",
      body: JSON.stringify(book),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async listBooks() {
    const res = await fetch("/api/books");
    if (!res.ok) {
      throw new Error(
        `Something went wrong loading ${res.url}: ${res.statusText}`
      );
    }
    return await res.json();
  }

  async fetchBook(id) {
    const res = await fetch(`/api/books/${id}`);
    if (!res.ok) {
      throw new Error(
        `Something went wrong loading ${res.url}: ${res.statusText}`
      );
    }
    return await res.json();
  }
}
