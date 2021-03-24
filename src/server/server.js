const express = require("express");
const path = require("path");

const app = express();

console.log("Hello world");

app.use(express.static(path.resolve(__dirname, "..", "..", "dist")));


const server = app.listen(3000, () => {
    console.log(`server started on http://localhost:${server.address().port}`)
})
