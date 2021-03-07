import {selectQuiz} from "../src/quiz";

describe("quiz", () => {
   
    it("returns a random question", () => {
        const question = selectQuiz();
        expect(typeof question.question).toBe("string");
        expect(question.alternatives).toHaveLength(4);
        expect(typeof question.answer).toBe("number");
    })
    
    
});