import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Link} from "react-router-dom";
import {Route, Switch} from "react-router";


function Application() {
    return <BrowserRouter>
        <Switch>
            <Route path={"/books"}>
                <h1>List books</h1>
            </Route>
            <Route path={"/create"}>
                <h1>Create new book</h1>
            </Route>
            <Route path={"/edit"}>
                <h1>Edit an existing book</h1>
            </Route>
            <Route exact path={"/"}>
                <h1>Book application home page</h1>
                <ul>
                    <li><Link to={"/books"}>List books</Link></li>
                    <li><Link to={"/create"}>Add a book</Link></li>
                </ul>
            </Route>
            <Route>
                Page not found
            </Route>
        </Switch>
    </BrowserRouter>;
}


ReactDOM.render(<Application />, document.getElementById("root"));
