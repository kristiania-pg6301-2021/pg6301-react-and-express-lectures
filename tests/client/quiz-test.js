import {selectQuiz} from "../../src/client/quiz";

describe("quiz", () => {
   
    it("returns a random question", async () => {
        global.fetch = jest.fn(() => Promise.resolve({
            ok: true,
            json: () => Promise.resolve({
                results: [
                    {
                        question: "Which of the following is a number",
                        correct_answer: "10",
                        incorrect_answers: ["x", "y", "z"]
                    }
                ]
            })
        }));
        
        const quiz = await selectQuiz();
        expect(quiz.question).toEqual("Which of the following is a number");
        expect(quiz.alternatives).toHaveLength(4);
        expect(quiz.alternatives).toContain("x");
        expect(quiz.alternatives).toContain("10");
        expect(typeof quiz.answer).toEqual("number");
    });
    
});