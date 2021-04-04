import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Link } from "react-router-dom";
import { Route, Switch } from "react-router";

function Application() {
  return (
    <BrowserRouter>
      <header>
        <Link to={"/"}>KristianiaQuiz</Link>
      </header>
      <main>
        <Switch>
          <Route path="/login">
            <h1>Login</h1>
          </Route>
          <Route path="/" exact>
            <h1>Home page</h1>
            <ul>
              <li>
                <Link to={"/login"}>Login</Link>
              </li>
            </ul>
          </Route>
        </Switch>
      </main>
    </BrowserRouter>
  );
}

ReactDOM.render(<Application />, document.getElementById("app"));
