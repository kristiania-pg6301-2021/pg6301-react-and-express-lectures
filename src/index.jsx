import React from "react";
import {useState} from "react";
import ReactDOM from "react-dom";
import {selectQuiz} from "./quiz";

function Quiz() {
    const [quiz, setQuiz] = useState(selectQuiz());
    
    function handleClick(answer) {
        if (answer === quiz.answer) {
            alert("Correct!");
            setQuiz(selectQuiz());
        } else {
            alert("Wrong! Try again!");
        }
    }
    
    return <>
        <h1>React Quiz!</h1>
        <div>{quiz.question}</div>
        {quiz.alternatives.map((a, index) => 
            <div key={index}><button onClick={() => handleClick(index)}>{a}</button></div>
        )}
    </>
}


ReactDOM.render(<Quiz />, document.getElementById("app"));
