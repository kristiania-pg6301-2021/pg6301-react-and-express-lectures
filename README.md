
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
* [x] Access an API and route frontend based on the response
  * `useLoader` and `fetchJson` in ProfilePage
  * Error handling in ProfilePage
  * Backend returns 401
  * Frontend button to redirect to login
  * Refactor to separate files
* [x] Implement a password login with Passport #5
  * LoginPage POSTs username and password to /api/login
  * `npm install -P session body-parser`
  * /api/profile returns username from session (wrong implementation)
  * `npm install -P passport passport-local`
  * Express login route to use `passport.authenticate("local")`
  * `passport.use(new LocalStrategy()); passport.serialize...()`
  * `app.use(passport.initialize()); app.use(passport.session())`
* [x] Implement Google login with Passport #6
  * LoginPage is replaced with server side page
  * `npm install -P dotenv passport-google-oauth20`
  * `passport.use(new GoogleStrategy());`
  * https://console.cloud.google.com/apis/credentials
  * `app.get("/oauth2callback")`
* [ ] Implement Active Directory login with Passport #7
  * `npm install -P passport-azure-ad`
  * `passport.use(nwe AzureStrategy())`
  * Change `authenticate()` argument
  * Turn on https - `https.createServer({key, cert}, app).listen(3000)`
  * `openssl req -new -nodes -x509 -subj "/CN=localhost" -addext "subjectAltName = DNS:localhost" -keyout server.key -out server.crt`


* [ ] Setup new Active Directory tenant 

Neste gang:

* [ ] Serve with HTTP certificate #11


