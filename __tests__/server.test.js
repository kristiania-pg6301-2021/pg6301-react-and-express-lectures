const request = require("supertest");
const { createApp } = require("../src/server/app");

describe("server api", () => {
  const app = createApp();

  it("lets user create book", async () => {
    await request(app)
      .post("/api/books")
      .send({ title: "Title", author: "My Title", year: 2018 })
      .set("Content-Type", "application/json");

    const books = await request(app).get("/api/books");
    expect(books.body.map((b) => b.title)).toContain("Title");
  });

  it("lets user fetch a single book", async () => {
    const books = (await request(app).get("/api/books")).body;
    const { id, title } = books[0];

    const book = (await request(app).get(`/api/books/${id}`)).body;
    expect(book).toMatchObject({ id, title });
  });

  it("lets user update single book", async () => {
    const { id, title, author, year } = (
      await request(app).get("/api/books")
    ).body[0];

    const newTitle = "New " + title;
    await request(app)
      .put(`/api/books/${id}`)
      .send({ title: newTitle, author, year })
      .set("Content-Type", "application/json");

    const updatedBook = (await request(app).get(`/api/books/${id}`)).body;
    expect(updatedBook).toMatchObject({ title: newTitle });
  });
});
