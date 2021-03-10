const express = require("express");
const path = require("path");

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


app.get("/api/books", (req, res) => {
    res.json(books);
})


app.use(express.static(path.resolve(__dirname, "..", "..", "dist")));

app.use((req, res, next) => {
    res.sendFile(path.resolve(__dirname, "..", "..", "dist", "index.html"));
});


app.listen(3000, () => {
    console.log("Started on http://localhost:3000");
});

