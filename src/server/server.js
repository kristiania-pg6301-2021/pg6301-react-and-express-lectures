const path = require("path");
const express = require("express");

const app = express();

app.get("/api/books", (req, res) => {
    res.json([
        {
            id: 1,
            title: "Lord or the Rings",
            author: "JRR Tolkien",
            year: 1954
        },
        {
            id: 2,
            title: "Uncle Tom's Cabin",
            author: "Harriet Beecher Stowe",
            year: 1852
        }
    ])
})


app.use(express.static(path.resolve(__dirname, "..", "..", "dist")));
app.use((_, res) => {
  res.sendFile(path.resolve(__dirname, "..", "..", "dist", "index.html"));
})

app.listen(3000, () => {
    console.log("Server started on http://localhost:3000")
})

