import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";
import {Route, Switch} from "react-router";
import {Match} from "./match";
import {selectQuiz} from "./quiz";
import {HomePage} from "./home";


function App() {
    return <BrowserRouter>
        <Switch>
            <Route path={"/match"}>
                <Match quizGenerator={selectQuiz}/>
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
