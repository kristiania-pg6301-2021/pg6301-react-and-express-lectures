export class BookApi {
  async saveBook(book) {
    await this.submitJson(`/api/books`, "POST", book);
  }

  async updateBook(id, book) {
    await this.submitJson(`/api/books/${id}`, "PUT", book);
  }

  async listBooks() {
    const res = this.checkError(await fetch("/api/books"));
    return await res.json();
  }

  async fetchBook(id) {
    const res = this.checkError(await fetch(`/api/books/${id}`));
    return await res.json();
  }

  checkError(res) {
    if (!res.ok) {
      throw new Error(
        `Something went wrong loading ${res.url}: ${res.statusText}`
      );
    }
    return res;
  }

  submitJson(url, method, payload) {
    return fetch(url, {
      method: method,
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
