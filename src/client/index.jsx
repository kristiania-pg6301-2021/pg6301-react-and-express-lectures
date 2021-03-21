import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Link } from "react-router-dom";
import { Route, Switch } from "react-router";
import { ProfilePage } from "./ProfilePage";
import { LoginPage } from "./LoginPage";

function Application() {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Link to={"/"}>Kristiania demo app</Link>
        </div>
        <Switch>
          <Route path={"/login"}>
            <LoginPage />
          </Route>
          <Route path={"/profile"}>
            <ProfilePage />
          </Route>
          <Route exact path={"/"}>
            <h1>Welcome</h1>
            <ul>
              <li>
                <Link to={"/profile"}>User profile</Link>
              </li>
              <li>
                <Link to={"/login"}>Log in</Link>
              </li>
            </ul>
          </Route>
          <Route>
            <h1>Page not found</h1>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

ReactDOM.render(<Application />, document.getElementById("root"));
