import React, {useState} from "react";
import {selectQuiz} from "./quiz";

export function Match() {
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
        <h1>Quiz!</h1>
        <div className="question">{quiz.question}</div>
        {quiz.alternatives.map((a, index) =>
            <div key={index}>
                <button className="alternative" onClick={() => handleClick(index)}>{a}</button>
            </div>
        )}
    </>
}