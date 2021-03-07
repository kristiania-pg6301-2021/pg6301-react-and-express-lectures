const quizzes = [
    {
        question: "What is the first color in the rainbow",
        alternatives: [
            "yellow", "red", "pink", "infrared"
        ],
        answer: 1
    },

    {
        question: "Who is Sherlock Holmes' companion",
        alternatives: [
            "dr strange", "dr who", "dr watson", "dr walton"
        ],
        answer: 2
    },

    {
        question: "What is the name of person who's killing sparked the 2020 Black Lives Matter protests",
        alternatives: [
            "Erik Garner", "Eugene Ejike Obiora", "Michael Brown", "George Floyd"
        ],
        answer: 3
    },
    {
        question: "In JavaScript, what is the result of the following?\n\n[3,18,1,2].sort()\n",
        alternatives: [
            "[1, 2, 3, 18]",
            "[1, 18, 2, 3]",
            "[18, 1, 2, 3]",
            "Runtime exception"
        ],
        answer: 1
    },
    {
        question: "In JavaScript, what is the result  of the following?\n\nfalse + true?",
        alternatives: [
            "false",
            "true",
            "'falsetrue'",
            "1"
        ],
        answer: 3
    },
    {
        question: "What is Babel mainly used for?",
        alternatives: [
            "To transpile code into valid JS code",
            "To bundle together the code of different JS files",
            "To download third-party    dependencies",
            "To run test cases"
        ],
        answer: 0
    }

];

export function selectQuiz() {
    return quizzes[Math.floor(Math.random() * quizzes.length)]
}
