import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Link} from "react-router-dom";
import {Route, Switch} from "react-router";
import {BookListPage} from "./BookListPage";
import {CreateBookPage} from "./CreateBookPage";

function Application() {
    return <BrowserRouter>
        <nav>
            <Link to={"/"}>Home</Link>
        </nav>
        <main>
            <Switch>
                <Route exact path={"/books"} component={BookListPage} />
                <Route path={"/create"}>
                    <CreateBookPage/>
                </Route>
                <Route path={"/edit"}>
                    <h1>Edit an existing book</h1>
                </Route>
                <Route exact path={"/"}>
                    <h1>Book application</h1>
                    <ul>
                        <li><Link to={"/books"}>List books</Link></li>
                        <li><Link to={"/create"}>Add a book</Link></li>
                    </ul>
                </Route>
                <Route>
                    Page not found
                </Route>
            </Switch>
        </main>
    </BrowserRouter>;
}


ReactDOM.render(<Application />, document.getElementById("root"));
