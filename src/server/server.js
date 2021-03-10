const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();

const books = [{
    id: 1,
    title: "Uncle Tom's Cabin",
    author: "Harriet Stowe",
    year: "1852"
},
    {
        id: 2,
        title: "Hakkebakkeskogen",
        author: "Thorbjørn Egner",
        year: "1953"
    }

];

app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, "..", "..", "dist")));

app.get("/api/books", (req, res) => {
    console.log(books);
    res.json(books);
})

app.post("/api/books", (req, res) => {
    const {title, author, year} = req.body;
    console.log(req.body);
   books.push({title, author, year, id: books.length+1})
    res.status(201);
   res.end();
});

app.use((req, res, next) => {
    if (req.method !== "GET") {
        return next();
    }
    res.sendFile(path.resolve(__dirname, "..", "..", "dist", "index.html"));
});


app.listen(3000, () => {
    console.log("Started on http://localhost:3000");
});

