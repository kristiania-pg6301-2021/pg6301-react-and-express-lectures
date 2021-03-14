export class BookApi {
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
