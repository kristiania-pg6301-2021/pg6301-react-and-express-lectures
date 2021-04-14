const request = require("supertest");

const express = require("express");

const app = express();
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
});
