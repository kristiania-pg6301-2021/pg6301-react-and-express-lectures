import * as React from "react";

import {BrowserRouter} from "react-router-dom";
import {Route, Switch} from "react-router";

interface Quiz {
    question: string;
    alternatives: string[];
}


function HomePage() {
    return <>
        <h1>Welcome to the quiz</h1>
        <button>Start new quiz</button>
    </>
}

function QuizPage({quizFactory}: {quizFactory(): Quiz}) {
    const quiz = quizFactory();
    const {question, alternatives} = quiz;
    return <>
        <h1>Quiz</h1>
        <div>Question: {question}</div>
        {alternatives.map(a =>
            <button>{a}</button>
        )}
    </>
}

export function App() {
    const quiz: Quiz = {
        question: "Are you happy today?",
        alternatives: ["yes", "no", "maybe"]
    }
    return <BrowserRouter>
        <Switch>
            <Route path="/quiz">
                <QuizPage quizFactory={() => quiz} />
            </Route>
            <Route exact path="/">
                <HomePage />
            </Route>
            <Route>
                Not found
            </Route>
        </Switch>
    </BrowserRouter>;
}