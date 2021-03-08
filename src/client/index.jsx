import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";
import {Route, Switch} from "react-router";
import {Match} from "./match";
import {HomePage} from "./home";

async function loadQuiz() {
    const res = await fetch("/api/quiz", {
        method: "POST"
    });
    if (!res.ok) {
        throw new Error(res.url + " failed " + res.statusText);
    }
    return await res.json();
}


function App() {
    return <BrowserRouter>
        <Switch>
            <Route path={"/match"}>
                <Match quizGenerator={loadQuiz}/>
            </Route>
            <Route exact path="/">
                <HomePage/>
            </Route>
            <Route>
                <h1>Page not found</h1>
            </Route>
        </Switch>
    </BrowserRouter>;
}



ReactDOM.render(<App />, document.getElementById("app"));
