import React, {useState} from "react";
import {Link} from "react-router-dom";

function MatchView({quiz, onAnswer}) {
    return <>
        <h1>Quiz!</h1>
        <div className="question">{quiz.question}</div>
        {quiz.alternatives.map((a, index) =>
            <div key={index}>
                <button className="alternative" onClick={() => onAnswer(index)}>{a}</button>
            </div>
        )}
        <Link to="/">Home</Link>
    </>;
}

export function Match({quizGenerator}) {
    const [quiz, setQuiz] = useState(quizGenerator());
    const [gameState, setGameState] = useState("playing");

    function handleAnswer(answer) {
        if (answer === quiz.answer) {
            setGameState("win");
        } else {
            setGameState("loss");
        }
    }
    
    function playAgain() {
        setQuiz(quizGenerator());
        setGameState("playing");
    }
    

    if (gameState === "win") {
        return <>
            <h1>You won!</h1>
            <button onClick={playAgain}>Play again</button>
        </>
    }
    if (gameState === "loss") {
        return <>
            <h1>You lost!</h1>
            <button onClick={playAgain}>Play again</button>
        </>
    }

    return <MatchView quiz={quiz} onAnswer={handleAnswer}/>;
}