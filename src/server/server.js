/* eslint-disable */
const https = require('https')
const fs = require('fs')

const {createApp} = require("./app");
const app = createApp();

https.createServer({
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
}, app).listen(3000, () => {
  console.log("App started");
});
