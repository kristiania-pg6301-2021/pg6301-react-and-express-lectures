class QuizGame {
  getState(match) {
    if (!match) {
      return { state: "not_started" };
    }
    const { state, answered, questions, score } = match;
    const current = questions.map(({ question, alternatives }) => ({
      question,
      alternatives,
    }))[answered];
    return { state, answered, score, current };
  }

  answerQuestion(match, answer) {
    const { score, questions, answered } = match;
    const current = questions[answered];
    return {
      ...match,
      score: current.answer === answer ? score + 1 : score,
      answered: answered + 1,
      state: answered >= questions.length - 1 ? "complete" : "ongoing",
    };
  }

  startMatch(quizGenerator) {
    return {
      state: "ongoing",
      answered: 0,
      score: 0,
      questions: quizGenerator(),
    };
  }

  pickSome(array, length) {
    if (array.length < length) {
      throw new Error("Array too short");
    }
    const copy = [...array];
    const result = [];
    while (result.length < length) {
      const index = Math.floor(Math.random() * copy.length);
      result.push(copy.splice(index, 1)[0]);
    }
    return result;
  }
}

module.exports = {
  QuizGame,
};
