const request = require("supertest");
const express = require("express");

const app = express();
app.use(require("body-parser").json());
app.use(require("../src/server/booksApi"));

describe("books api", () => {
  it("can list initial books", async () => {
    await request(app)
      .get("/")
      .then((response) => {
        expect(response.body.find(({ id }) => id === 2)).toMatchObject({
          title: "Hakkebakkeskogen",
          author: "Thorbjørn Egner",
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
      .expect(201);
    await request(app)
      .get("/")
      .then((response) => {
        expect(response.body.map(({ title }) => title)).toContain(
          "My New Book"
        );
      });
  });

  it("can update existing books", async () => {
    const book = (await request(app).get("/2")).body;
    const updated = {
      ...book,
      author: "Egner",
    };
    await request(app).put("/2").send(updated).expect(200);
    await request(app)
      .get("/2")
      .then((response) => {
        expect(response.body).toMatchObject({
          id: 2,
          author: "Egner",
        });
      });
  });
});
