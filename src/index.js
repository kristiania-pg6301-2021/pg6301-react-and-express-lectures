import {selectQuiz} from "./quiz";


let currentQuestion;

showQuestion();

function handleAnswer(alternative) {
    if (alternative === currentQuestion.answer) {
        alert("Correct!");
        showQuestion();
    } else {
        alert("Wrong! Try again");
    }
}

function showQuestion() {
    currentQuestion = selectQuiz();

    document.getElementById("question").innerText = currentQuestion.question;

    document.getElementById("alternative-0").innerText = currentQuestion.alternatives[0];
    document.getElementById("alternative-0").onclick = () => handleAnswer(0)
    document.getElementById("alternative-1").innerText = currentQuestion.alternatives[1];
    document.getElementById("alternative-1").onclick = () => handleAnswer(1)
    document.getElementById("alternative-2").innerText = currentQuestion.alternatives[2];
    document.getElementById("alternative-2").onclick = () => handleAnswer(2)
    document.getElementById("alternative-3").innerText = currentQuestion.alternatives[3];
    document.getElementById("alternative-3").onclick = () => handleAnswer(3)
}
