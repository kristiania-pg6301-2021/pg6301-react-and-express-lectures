const request = require("supertest");

const express = require("express");

const app = express();
app.use(require("body-parser").json());
app.use(require("../src/server/bookApi"));

describe("book API", () => {
  it("can return the predefined books", async () => {
    await request(app)
      .get("")
      .then((response) => {
        expect(response.body.find(({ id }) => id === 2)).toMatchObject({
          title: "Hakkebakkeskogen",
        });
      });
  });

  it("can create a new book", async () => {
    await request(app)
      .post("")
      .send({
        title: "Idioten",
        author: "Dostoevsky",
        year: "1868",
      })
      .expect(201);
    await request(app)
      .get("")
      .then((response) => {
        expect(response.body.map(({ title }) => title)).toContain("Idioten");
      });
  });
});
