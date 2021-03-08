import React, {useState, useEffect} from "react";
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
    const [quiz, setQuiz] = useState();
    const [gameState, setGameState] = useState("loading");
    
    async function loadQuestion() {
        setGameState("loading");
        const quiz = await quizGenerator();
        setQuiz(quiz);
        setGameState("playing");
    }
    
    useEffect(() => loadQuestion(), []);

    function handleAnswer(answer) {
        if (answer === quiz.answer) {
            setGameState("win");
        } else {
            setGameState("loss");
        }
    }
    
    if (gameState === "loading") {
        return <>
            <h1>Quiz</h1>
            <div>Loading...</div>
        </>
    }
    if (gameState === "win") {
        return <>
            <h1>You won!</h1>
            <button onClick={loadQuestion}>Play again</button>
        </>
    }
    if (gameState === "loss") {
        return <>
            <h1>You lost!</h1>
            <button onClick={loadQuestion}>Play again</button>
        </>
    }

    return <MatchView quiz={quiz} onAnswer={handleAnswer}/>;
}