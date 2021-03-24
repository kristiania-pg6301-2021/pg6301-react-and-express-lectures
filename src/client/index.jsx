import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Link} from "react-router-dom";
import {Route, Switch} from "react-router";

function ProfilePage() {
    return <div>
        <h1>Your profile:</h1>
        <div>Username: Johannes</div>
    </div>;
}

function LoginPage() {
    return null;
}

function FrontPage() {
    return <div>
        <h1>Welcome</h1>
        <ul>
            <li><Link to="/profile">Profile page</Link></li>
            <li><Link to="/login">Login</Link></li>
        </ul>
    </div>;
}

function Application() {
    return <BrowserRouter>
        <header>
            <Link to="/">Front page</Link>
        </header>
        <Switch>
            <Route path="/profile">
                <ProfilePage />
            </Route>
            <Route path="/login">
                <LoginPage />
            </Route>
            <Route exact path="/">
                <FrontPage />
            </Route>
            <Route>
                <h1>Not found</h1>
            </Route>
        </Switch>
    </BrowserRouter>;
}

ReactDOM.render(<Application />, document.getElementById("app"));