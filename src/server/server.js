const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

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

const router = express.Router();

router.get("/", (req, res) => {
  console.log(books);
  res.json(books);
});

router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find((b) => b.id === id);
  res.json(book);
});

router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const bookIndex = books.findIndex((b) => b.id === id);
  const { title, author, year } = req.body;
  books[bookIndex] = { title, author, year, id };
  res.status(200).end();
});

router.post("/", (req, res) => {
  const { title, author, year } = req.body;
  console.log(req.body);
  books.push({ title, author, year, id: books.length + 1 });
  res.status(201).end();
});

app.use("/api/books", router);

app.use((req, res, next) => {
  if (req.method !== "GET" || req.path.startsWith("/api")) {
    return next();
  }
  res.sendFile(path.resolve(__dirname, "..", "..", "dist", "index.html"));
});

app.listen(3000, () => {
  console.log("Started on http://localhost:3000");
});
