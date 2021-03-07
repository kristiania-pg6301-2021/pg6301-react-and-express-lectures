import React, {useState} from "react";

function MatchView({quiz, onAnswer}) {
    return <>
        <h1>Quiz!</h1>
        <div className="question">{quiz.question}</div>
        {quiz.alternatives.map((a, index) =>
            <div key={index}>
                <button className="alternative" onClick={() => onAnswer(index)}>{a}</button>
            </div>
        )}
    </>;
}

export function Match({quizGenerator}) {
    const [quiz, setQuiz] = useState(quizGenerator());

    function handleAnswer(answer) {
        if (answer === quiz.answer) {
            alert("Correct!");
            setQuiz(quizGenerator());
        } else {
            alert("Wrong! Try again!");
        }
    }

    return <MatchView quiz={quiz} onAnswer={handleAnswer} />; 
}