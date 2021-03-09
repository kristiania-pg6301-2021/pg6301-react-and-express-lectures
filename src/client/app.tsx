import * as React from "react";

import {BrowserRouter} from "react-router-dom";
import {Route, Switch} from "react-router";
import {useEffect, useState} from "react";

export interface Quiz {
    question: string;
    alternatives: string[];
}


function HomePage() {
    return <>
        <h1>Welcome to the quiz</h1>
        <button>Start new quiz</button>
    </>
}

export function QuizPage({quizFactory}: {quizFactory(): Promise<Quiz>}) {
    const [quiz, setQuiz] = useState<Quiz|undefined>();
    const [error, setError] = useState<Error|undefined>();

    async function loadQuiz() {
        setError(undefined);
        setQuiz(undefined);
        try {
            setQuiz(await quizFactory());
        } catch (e) {
            setError(e);
        }
    }
    
    useEffect(() => {
        loadQuiz();
    }, []);
    
    if (error) {
        return <>
            <h1>An error occurred</h1>
            <pre>{error.toString()}</pre>
            <button onClick={() => loadQuiz()}>Retry</button>
        </>
    }
    
    if (!quiz) {
        return <>
            <h1>Loading</h1>
        </>;
    }
    
    const {question, alternatives} = quiz;
    return <>
        <h1>Quiz</h1>
        <div>Question: {question}</div>
        {alternatives.map((a, index) =>
            <button key={index}>{a}</button>
        )}
    </>
}

export function App({quizFactory}: {quizFactory(): Promise<Quiz>}) {
    return <BrowserRouter>
        <Switch>
            <Route path="/quiz">
                <QuizPage quizFactory={quizFactory} />
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