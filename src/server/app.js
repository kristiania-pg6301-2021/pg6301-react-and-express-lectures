const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

function createApp() {
  const app = express();

  const books = [
    {
      id: 1,
      title: "Uncle Tom's Cabin",
      author: "Harriet Stowe",
      year: "1852",
    },
    {
      id: 2,
      title: "Hakkebakkeskogen",
      author: "Thorbjørn Egner",
      year: "1953",
    },
  ];

  app.use(bodyParser.json());
  app.use(express.static(path.resolve(__dirname, "..", "..", "dist")));

  app.get("/api/books/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const book = books.find((b) => b.id === id);
    if (book) {
      res.json(book);
    } else {
      res.sendStatus(404);
    }
  });

  app.put("/api/books/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { title, author, year } = req.body;
    const index = books.findIndex((b) => b.id === id);
    books[index] = { id, title, author, year };
    res.status(200);
    res.end();
  });

  app.get("/api/books", (req, res) => {
    res.json(books);
  });

  app.post("/api/books", (req, res) => {
    const { title, author, year } = req.body;
    books.push({ title, author, year, id: books.length + 1 });
    res.status(201);
    res.end();
  });

  app.use((req, res, next) => {
    if (req.method !== "GET") {
      return next();
    }
    res.sendFile(path.resolve(__dirname, "..", "..", "dist", "index.html"));
  });
  return app;
}

module.exports = { createApp };
