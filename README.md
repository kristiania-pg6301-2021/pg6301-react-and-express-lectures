
* [x] Create a react app with parcel
  * `npm init`
  * `npm install -D parcel@next`
  * `npm install -P react react-dom`
  * Create `src/client/index.html` and `src/client/index.jsx`
  * Create a package.json script for parcel: `parcel src/client/index.html`
* [x] Serve the app from express
  * `npm install -D nodemon concurrently`
  * Create `src/server/server.js`
  * Create package.json script for express: `nodemon --watch src/server src/server/server.js`
  * Create package.json concurrently script
  * `npm install -P express`
  * `require("express")().listen(3000)`
  * `app.use(express.static(path(__dirname, "..", "..", "dist")`
  * `app.use((req, res, next) => res.sendFile(...)`
* [x] Route the frontend
  * `npm install -P react-router react-router-dom`
  * Create Application, FrontPage, LoginPage and ProfilePage
* [x] Format and lint the code
  * `npm install -D eslint prettier`
  * Add package script for prettier
  * Setup prettier in IntelliJ
  * `./node_modules/.bin/eslint --init`
  * Add package script for eslint
* [ ] Access an API and route frontend based on the response
* [ ] Implement a password login with Passport #5
* [ ] Implement Google login with Passport #6
* [ ] Implement Active Directory login with Passport #7
    * [ ] Setup new Active Directory tenant 

Neste gang:

* [ ] Serve with HTTP certificate #11


