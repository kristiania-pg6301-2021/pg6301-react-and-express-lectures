

* [x] Create react app with parcel
  * `npm init`
  * `npm -D parcel@next`
  * `npm -P react react-dom`
  * Create `src/client/index.html` and `src/client/index.jsx`
  * package.json script for parcel
* [x] Serve app from express
  * `npm install -P express`
  * `npm install -D nodemon`
  * Create `src/server/server.js`
  * `listen(3000)`
  * `app.use(express.static())`
* [x] Setup express with https
  * Add `127.0.0.1 webapps.kristiania.no` in /etc/hosts (c:\windows\system32\drivers\etc\hosts)
  * Create a certificate with `openssl req -x509 -nodes -keyout server.key -out server.crt -subj "/CN=webapps.kristiania.no" -addext "subjectAltName = DNS:webapps.kristiania.no"`
  * Install self-signed certificate as Trusted Root CA
  * Use https certificate in express `const server = https.createServer({ key: fs.readFileSync("server.key"), cert: fs.readFileSync("server.crt") }, app).listen(3000`
* [x] Route in frontend
  * `npm install -P react-router react-router-dom`
  * Extract Application, FrontPage, LoginPage, ProfilePage
  * `app.use(() => .... res.sendFile("index.html")`
* [x] Access API from frontend - with custom hooks
  * ProfilePage fetches /api/profile using new useLoading, fetchJson functions
  * Implement /api/profile (dummy) on express
* [x] prettier to format code
  * `npm install -D prettier`
  * Add package script for prettier
  * Setup prettier in IntelliJ/VS Code
* [x] Implement login with cookie
  * If we don't know the user, /api/profiles give 401
  * If we get 401, let the user log in
  * LoginPage uses new `useSubmit` and `postJson` helpers to submit the login form
  * Save username on cookie:
  * `npm install -P body-parser cookie-parser`
  * `app.use(bodyParser.json()); app.use(cookieParser());`
  * `app.post("/api/login", (req, res) => {const { username } = req.body; req.cookies.username = username; res.end();});`
  * `app.get("/api/profile", (req, res) => { const { username } = req.cookies;  res.json({ username }); }`
  * (Add check for username present in GET /api/profile)
* [x] Implement login with session
  * `npm install -P express-session`
  * `app.use(session({...}))`
  * Exchange `.cookie` with `.session` in POST /api/login and GET /api/profile
* [x] Implement password login with passport js
  * Use `passport.authenticate` to handle `POST /api/login`
  * Configure how to check username and passport with the local passport strategy
  * Configure how to store and serialize user with passport
  * use `req.user` in /api/profile
* [x] Implement Cross Origin Resource Sharing headers with GET request
  * Update URL for profile
  * Use https with parcel
  * Implement headers
* [x] Implement Cross Origin Resource Sharing headers with POST request
  * Change profile fetch to use POST
  * Implement more headers and OPTIONS
* [x] Implement Implicit Oauth2 flow with Google in frontend
  * Generate redirect URL
  * Handle callback
  * Send access_token to server in header
