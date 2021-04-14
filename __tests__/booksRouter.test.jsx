const request = require("supertest");
const express = require("express");

const app = express();
app.use(require("../src/server/booksApi"));

describe("books api", () => {
  it("can list initial books", async () => {
    await request(app)
      .get("/")
      .then((response) => {
        expect(response.body.find(({ id }) => id === 2)).toMatchObject({
          title: "Hakkebakkeskogen",
        });
      });
  });

  it("can add a new book", async () => {
    await request(app)
      .post("/")
      .send({
        title: "My New Book",
        author: "Tester",
        year: 2021,
      })
      .expect(200);
    await request(app)
      .get("/")
      .then((response) => {
        expect(response.body.map(({ title }) => title)).toContain(
          "My new book"
        );
      });
  });
});
