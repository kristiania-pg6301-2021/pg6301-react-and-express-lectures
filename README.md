# PG6301 Web Development and API design

Welcome to this course in Web Development and API Design. In this course, we will
look at creating single-page applications with React backed by APIs implemented
with React.

The first lectures of this course (as of 2021) are documented on
[Andrea's](https://github.com/arcuri82/web_development_and_api_design) Github
page for the course. Here, you will find slides and exercises.

For lecture 7-12, the current Github repository contains the code that was
presented during the lectures. Each lecture contains slides (from Andrea),
a commit log for the live coding demonstrated during the lecture, a
reference implementation of the live code objective and the Github issues
resolved during the lecture.

### Lecture 7: Creating a REST-ful API with Express

The lecture covers the "book application" and introduced React Hooks and Parcel

* [Slides](https://github.com/arcuri82/web_development_and_api_design/blob/master/docs/slides/lesson_07.pdf)
* [Commit log from live coding](https://github.com/kristiania-pg6301-2021/pg6301-react-and-express-lectures/commits/lectures/07)
* [Reference implementation](https://github.com/kristiania-pg6301-2021/pg6301-react-and-express-lectures/tree/reference/07) 

### Lecture 8: REST-ful APIs, part 2

The lecture continued the "book application" and repeated testing with modern React

* [Slides](https://github.com/arcuri82/web_development_and_api_design/blob/master/docs/slides/lesson_08.pdf)
* [Commit log from live coding](https://github.com/kristiania-pg6301-2021/pg6301-react-and-express-lectures/commits/lectures/08)
* [Reference implementation](https://github.com/kristiania-pg6301-2021/pg6301-react-and-express-lectures/tree/reference/08) 
* [Issues resolved](https://github.com/kristiania-pg6301-2021/pg6301-react-and-express-lectures/milestone/1?closed=1)

### Lecture 9: Sessions, cookies and login

The lecture starts a new minimal React + Express application and implements https, cookies and sessions

* [Slides](https://github.com/arcuri82/web_development_and_api_design/blob/master/docs/slides/lesson_09.pdf)
* [Commit log from live coding](https://github.com/kristiania-pg6301-2021/pg6301-react-and-express-lectures/commits/lectures/09)
* [Reference implementation](https://github.com/kristiania-pg6301-2021/pg6301-react-and-express-lectures/tree/reference/09)
* [Issues resolved](https://github.com/kristiania-pg6301-2021/pg6301-react-and-express-lectures/milestone/2?closed=1)

### Lecture 10: Passport, OpenID Connect and login with Google

The lecture uses Passport to login with password and with Google and also shows how to implement OpenID
Connect "manually" in the front-end. We also covered Cross Origin Resource Sharing (CORS) to access
an API on another host/port than the client.

* [Slides](https://github.com/arcuri82/web_development_and_api_design/blob/master/docs/slides/lesson_10.pdf)
* [Commit log from live coding](https://github.com/kristiania-pg6301-2021/pg6301-react-and-express-lectures/commits/lectures/10)
    * [Commit log from live exercise rehearsal](https://github.com/kristiania-pg6301-2021/pg6301-react-and-express-lectures/tree/exercise/10.2)
* [Reference implementation](https://github.com/kristiania-pg6301-2021/pg6301-react-and-express-lectures/tree/reference/10)
* [Issues resolved](https://github.com/kristiania-pg6301-2021/pg6301-react-and-express-lectures/milestone/3?closed=1)

### Lecture 11: Effective testing

In this lecture, we cover testing that React components render correctly, that
button clicks and inputs have the desired effect and that Express responds
correctly to API calls.

The lecture continues with the code from [lecture 8])(https://github.com/kristiania-pg6301-2021/pg6301-react-and-express-lectures/tree/lectures/08)

* [Issues resolved](https://github.com/kristiania-pg6301-2021/pg6301-react-and-express-lectures/milestone/4)
* [Commit log from live coding](https://github.com/kristiania-pg6301-2021/pg6301-react-and-express-lectures/commits/lectures/10)
* [Reference implementation](https://github.com/kristiania-pg6301-2021/pg6301-react-and-express-lectures/tree/reference/10)


## Reference material

### Creating a React Application with Express backend

1. `npm init -y`
2. `npm install -D parcel@next nodemon concurrently prettier`
3. `npm install -P react react-dom react-router react-router-dom express`
4. Add the following "scripts" in `package.json`:
    * `"start": "concurrently npm:server npm:client"`
    * `"client": "parcel src/client/index.html"`
    * `"server": "nodemon --watch src/server src/server/server.js"`
5. Create a minimal HTML file as `src/client/index.html`. This is the essence:
    * `<html><body><div id="app"></div></body><script src="index.jsx"></script></html>`
6. Create a minimal `src/client/index.jsx`. In addition to importing React and ReactDOM, this is the essence:
    * `ReactDOM.render(<h1>Hello World</h1>, document.getElementById("app"));`
7. Create a minimal `src/server/server.js`:
    * `const express = require("express");`
    * `const app = express();`
    * `express.listen(3000);`
8. Start everything with `npm start`
9. Add `.idea` (if appropriate), `node_modules`, `dist` and `.parcel-cache` to `.gitignore`.

### Crucial tasks

When you can get this to work, you will need to master the following:

* Serve the frontend code from Express. In `server.js`:
   * `app.use(express.static(path.resolve(__dir, "..", "..", "dist")));`
* To get express router to function correctly, make Express return index.html on unmatched files:
   * `app.use((req, res, next) => res.sendFile(path.resolve(__dir, "..", "..", "dist", "index.html")));`
* Use React Router in front-end
* Make React call API calls on the backend (using `fetch`)
* Make Express respond to API calls
