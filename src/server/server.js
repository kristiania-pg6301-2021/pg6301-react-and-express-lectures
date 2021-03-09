const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const books = [
  {
    id: 1,
    title: "Lord or the Rings",
    author: "JRR Tolkien",
    year: 1954,
  },
  {
    id: 2,
    title: "Uncle Tom's Cabin",
    author: "Harriet Beecher Stowe",
    year: 1852,
  },
];

app.use(bodyParser.json());

app.get("/api/books/:id", (req, res) => {
  console.log({ id: req.params.id });
  res.json(books.find((b) => b.id == req.params.id));
});

app.get("/api/books", (req, res) => {
  res.json(books);
});

app.post("/api/books", async (req, res) => {
  const book = req.body;
  const { author, title, year } = book;
  books.push({ author, title, year, id: books.length + 1 });
  res.status(201);
  res.send();
});

app.use(express.static(path.resolve(__dirname, "..", "..", "dist")));
app.use((_, res) => {
  res.sendFile(path.resolve(__dirname, "..", "..", "dist", "index.html"));
});

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
