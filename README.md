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

The lecture continues with the code from [lecture 8](https://github.com/kristiania-pg6301-2021/pg6301-react-and-express-lectures/tree/lectures/08)

* [Issues resolved](https://github.com/kristiania-pg6301-2021/pg6301-react-and-express-lectures/milestone/4)
* [Commit log from live coding](https://github.com/kristiania-pg6301-2021/pg6301-react-and-express-lectures/commits/lectures/11)
* [Reference implementation](https://github.com/kristiania-pg6301-2021/pg6301-react-and-express-lectures/tree/reference/11)
* [Commit log from live exercise rehearsal](https://github.com/kristiania-pg6301-2021/pg6301-react-and-express-lectures/tree/exercise/11)

### Lecture 12: Web Sockets

In this lecture, we cover more real-time communication between server and clients using WebSockets. We will also revisit testing of the client in the context of this application.

This lecture starts with a new React + Express application

* [Issues resolved](https://github.com/kristiania-pg6301-2021/pg6301-react-and-express-lectures/milestone/5)
* [Commit log from live coding](https://github.com/kristiania-pg6301-2021/pg6301-react-and-express-lectures/commits/lectures/12)
* [Reference implementation](https://github.com/kristiania-pg6301-2021/pg6301-react-and-express-lectures/tree/reference/12)

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

### Testing

### Installing

When using test, we need to add some babel mumbo jumbo to get Jest to understand modern JavaScript syntax as well as JSX tags

1. `npm install -D jest babel-jest`

You need the following fragment or similar in `package.json`:

```
  "jest": {
    "transform": {
      "\\.jsx": "babel-jest"
    }
  },
  "babel": {
    "presets": [
      "@babel/preset-env",
      "@babel/preset-react"
    ]
  },
  "browserslist": [
    "last 1 Chrome version"
  ]
```

The `jest`-section tells jest to use babel to transform `jsx`-files, the `babel`-section tells babel to use the browserlist ("preset-env") and react to transform files and `browserlist` tells babel to target the newest version of Chrome.

With this in place, it should be possible to run tests like those below.

#### Snapshot testing - check that a view is rendered correctly

```javascript
  it("loads book", async () => {
    // Fake data instead of calling the real backend
    const getBook = () => ({
      title: "My Book",
      author: "Firstname Lastname",
      year: 1999,
    });
    // Construct an artification dom element to display the app (with jsdom)
    const container = document.createElement("div");
    // The act method from react-dom/test-utils ensures that promises are resolved
    //  - that is, we wait until the `getBook` function returns a value
    await act(async () => {
      await ReactDOM.render(
        <!-- construct an object with the necessary wrapping - in our case, routing -->
        <MemoryRouter initialEntries={["/books/12/edit"]}>
          <Route path={"/books/:id/edit"}>
            <!-- use shorthand properties to construct an api object with
              getBook property with the getBook function
              -->
            <EditBookPage bookApi={{ getBook }} />
          </Route>
        </MemoryRouter>,
        container
      );
    });
    // Snapshot tests fail if the page is changed in any way - intentionally or non-intentionally
    expect(container.innerHTML).toMatchSnapshot();
    // querySelector can be used to find dom elements in order to make assertions
    expect(container.querySelector("h1").textContent).toEqual("Edit book: My Book")
  });
```

#### Simulate events

```javascript
  it("updates book on submit", async () => {
    const getBook = () => ({
      title: "My Book",
      author: "Firstname Lastname",
      year: 1999,
    });
    // We create a mock function. Instead of having functionality,
    // this fake implementation of updateBook() lets us record and
    // make assertions about the calls to the function
    const updateBook = jest.fn();
    const container = document.createElement("div");
    await act(async () => {
      await ReactDOM.render(
        <MemoryRouter initialEntries={["/books/12/edit"]}>
          <Route path={"/books/:id/edit"}>
            <EditBookPage bookApi={{ getBook, updateBook }} />
          </Route>
        </MemoryRouter>,
        container
      );
    });

    // The simulate function lets us create artificatial events, such as
    // a change event (which will trigger the `onChange` handler of our 
    // component
    Simulate.change(container.querySelector("input"), {
      // The object we pass must work with e.target.value in the event handler
      target: {
        value: "New Value",
      },
    });
    Simulate.submit(container.querySelector("form"));
    // We check that the call to `updateBook` is as expected
    // The value "12" is from MemoryRouter intialEntries
    expect(updateBook).toHaveBeenCalledWith("12", {
      title: "New Value",
      author: "Firstname Lastname",
      year: 1999,
    });
  });
```

#### Using supertest to check server side behavior

```javascript
const request = require("supertest");
const express = require("express");

const app = express();
app.use(require("body-parser").json());
app.use(require("../src/server/booksApi"));

describe("...", () => {

  it("can update existing books", async () => {
    const book = (await request(app).get("/2")).body;
    const updated = {
      ...book,
      author: "Egner",
    };
    await request(app).put("/2").send(updated).expect(200);
    await request(app)
      .get("/2")
      .then((response) => {
        expect(response.body).toMatchObject({
          id: 2,
          author: "Egner",
        });
      });
  });

});
```

## WebSockets

### Client side:

```javascript
    // Connect to ws on the same host as we got the frontend
    const ws = new WebSocket("ws://" + window.location.host);
    // log out the message and destructor the contents when we receive it
    ws.onmessage = (msg) => {
      console.log(msg);
      const { username, message, id } = JSON.parse(msg.data);
    };
    // send a new message
    ws.send(JSON.stringify({username: "Myself", message: "Hello"}));
```

### Server side

```javascript

// Create a websocket server
const wsServer = new ws.Server({ noServer: true });

// Keep a list of all incomings connections
const sockets = [];
let messageIndex = 0;
wsServer.on("connection", (socket) => {
  // Add this connection to the list of connections
  sockets.push(socket);
  // Set up the handling of messages from this sockets
  socket.on("message", (msg) => {
    // Destructor the incoming message
    const { username, message } = JSON.parse(msg);
    // Add fields from server side
    const id = messageIndex++;
    // broadcast a new message to all recipients
    for (const recipient of sockets) {
      recipient.send(JSON.stringify({ id, username, message }));
    }
  });
});

// Start express app
const server = app.listen(3000, () => {
  // Handle incoming clients
  server.on("upgrade", (req, socket, head) => {
    wsServer.handleUpgrade(req, socket, head, (socket) => {
      // This will pass control to `wsServer.on("connection")`
      wsServer.emit("connection", socket, req);
    });
  });
});
```

## OpenID Connect - Log on with Google

### Client side (implicit flow)

"Implicit flow" means that the login provider (Google) will not require a client secret to complete the authentication. This is often not recommended, and for example Active Directory instead uses another mechanism called PKCE, which protects against some security risks.

1. Set up the application in [Google Cloud Console](https://console.cloud.google.com/apis/credentials). Create a new OAuth client ID and select Web Application. Make sure `http://localhost:3000` is added as an Authorized JavaScript origin and `http://localhost:3000/callback` is an authorized redirect URI
2. To start authentication, redirect the browser (see code below)
3. To complete the authentication, pick up the `access_token` when Google redirects the browser back (see code below)
4. Save the `access_token` (e.g. in `localStorage`) and add as a header to all requests to backend

#### Redirect the client to authenticate

```javascript
export function Login() {
  async function handleStartLogin() {
    // Get the location of endpoints from Google
    const { authorization_endpoint } = await fetchJson(
      "https://accounts.google.com/.well-known/openid-configuration"
    );
    // Tell Google how to authentication
    const query = new URLSearchParams({
      response_type: "token",
      scope: "openid profile email",
      client_id:
        "<get this from Google Cloud Console>",
      // Tell user to come back to http://localhost:3000/callback when logged in
      redirect_uri: window.location.origin + "/callback",
    });
    // Redirect the browser to log in
    window.location.href = authorization_endpoint + "?" + query;
  }

  return <button onClick={handleStartLogin}>Log in</button>;
}
```

In the case of Active Directory, you also need parameters `response_type: "code"`, `response_mode: "fragment"`, `code_challenge_method` and `code_challenge` (the latest two are needed for PKCE).

#### Handle the authentication callback

```javascript

// Router should take user here on /callback
export function CompleteLoginPage({onComplete}) {
  // Given an URL like http://localhost:3000/callback#access_token=sdlgnsoln&foo=bar,
  //  window.location.hash will give the part starting with "#"
  //  ...substring(1) will remove the "#"
  //  and Object.fromEntries(new URLSearchParams(...)) will parse it into an object
  // In this case, hash = { access_token: "sdlgnsoln", foo: "bar" }
  const hash = Object.fromEntries(
    new URLSearchParams(window.location.hash.substr(1))
  );
  // Get the values returned from the login provider. For Active Directory,
  // this will be more complex
  const { access_token, error } = hash;
  useEffect(() => {
    // Send the access token back to the outside application. This should
    //  be saved to localStorage and then redirect the user
    onComplete({access_token});
  }, [access_token]);
  
  if (error) {
    // deal with the user failing to log in or to give consent with Google
  }
  
  return <div>Completing loging...</div>;
}
```

For Active Directory, the hash will instead include a `code`, which you will then need to send to the `token_endpoint` along with the `client_id` and `redirect_uri` as well as `grant_type: "authorization_code"` and the `code_verifier` value from PKCE. This call will return the `access_token`.

#### Handle access_token on the backend

```javascript

app.use(async (req, res, next) => {
  const authorization = req.header("Authorization");
  if (authorization) {
    const { userinfo_endpoint } = await fetchJSON(
      "https://accounts.google.com/.well-known/openid-configuration"
    );
    req.userinfo = await fetchJSON(userinfo_endpoint, {
      headers: { authorization },
    });
  }
  next();
});

app.get("/profile", (req, res) => {
  if (!req.userinfo) {
    return res.send(200);
  }
});

```
