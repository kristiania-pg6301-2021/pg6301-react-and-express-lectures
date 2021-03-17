/* eslint-disable */
const https = require('https')
const fs = require('fs')

const {createApp} = require("./app");
const app = createApp();

//  openssl req -new -nodes -x509 -subj "/C=no/CN=webapps.kristiania.no" -addext "subjectAltName = DNS:webapps.kristiania.no" -addext "certificatePolicies = 1.2.3.4" -keyout server.key -out server.crt
https.createServer({
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.crt')
}, app).listen(3000, () => {
  console.log("App started");
});
