import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Link} from "react-router-dom";
import {Route, Switch} from "react-router";
import {BookListPage} from "./BookListPage";
import {CreateBookPage} from "./CreateBookPage";
import {EditBookPage} from "./EditBookPage";

class BookApi {
    async listBooks() {
        const res = await fetch("/api/books");
        if (!res.ok) {
            throw new Error(`Something went wrong loading ${res.url}: ${res.statusText}`);
        }
        return await res.json();
    }
    
    async fetchBook(id) {
        const res = await fetch(`/api/books/${id}`);
        if (!res.ok) {
            throw new Error(`Something went wrong loading ${res.url}: ${res.statusText}`);
        }
        return await res.json();
    }
}


function Application() {
    const bookApi = new BookApi();
    return <BrowserRouter>
        <nav>
            <Link to={"/"}>Home</Link>
        </nav>
        <main>
            <Switch>
                <Route path={"/books"}>
                    <BookListPage bookApi={bookApi}/>
                </Route>
                <Route path={"/create"}>
                    <CreateBookPage bookApi={bookApi}/>
                </Route>
                <Route path={"/edit"}>
                    <EditBookPage bookApi={bookApi}/>
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
        </main>
    </BrowserRouter>;
}


ReactDOM.render(<Application />, document.getElementById("root"));
