# CORS (cross origin resource sharing) demo

* [ ] React fetches data from express on different origin
* [ ] React tries to use a session with the backend
* [ ] React authenticates with AD with PKCE
* [ ] React passes access token as request header

# Log

1. `npm init`
2. `npm install -D parcel@next`
3. `npm install -P react react-dom express`
4. `npm install -D concurrently prettier nodemon`
5. Add `start`, `start:client`, `start:server`, `format` scripts
6. Create `src/client/index.html`, `src/client/index.jsx`, `src/server/server.js`
7. Client loads data from server