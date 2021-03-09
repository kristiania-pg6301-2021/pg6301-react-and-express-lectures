import * as React from "react";
import * as ReactDOM from "react-dom";
import {App, Quiz} from "./app";

function sleep(millis: number): Promise<void> {
    return new Promise((resolve => {
        setTimeout(resolve, millis);
    }));
}

async function quizFactory() {
    await sleep(500);
    
    if (Math.random() < 0.5) {
        throw new Error("Oh noes!");
    }
    
    const quiz: Quiz = {
        question: "Are you happy?",
        alternatives: ["yes", "no", "maybe"]
    }
    return quiz;
}


ReactDOM.render(<App quizFactory={quizFactory} />, document.getElementById("app"));