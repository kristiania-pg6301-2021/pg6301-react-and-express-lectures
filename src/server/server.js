const { createApp } = require("./app");

const app = createApp();

app.listen(3000, () => {
  console.log("Started on http://localhost:3000");
});
