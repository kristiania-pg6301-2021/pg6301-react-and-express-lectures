

* [ ] Create react app with parcel
  * `npm init`
  * `npm -D parcel@next`
  * `npm -P react react-dom`
  * Create `src/client/index.html` and `src/client/index.jsx`
  * package.json script for parcel   
* [ ] Serve app from express
  * `npm install -P express`
  * `npm install -D nodemon`
  * Create `src/server/server.js`
  * `listen(3000)`
  * `app.use(express.static())`
* [ ] Setup express with https
  * Add webapps.kristiania.no 127.0.0.1 in /etc/hosts
  * Create a certificate with `openssl req`
  * Use https certificate in express
* [ ] Route in fronter
  * `app.use(() => .... res.sendFile("index.html")`
* [ ] Access API from frontend - with custom hooks
* [ ] prettier to format code
* [ ] Implement session with cookie
* [ ] Implement password login with passport js
* [ ] Implement Google with passport js
* [ ] Implement Active Directory with passport js
