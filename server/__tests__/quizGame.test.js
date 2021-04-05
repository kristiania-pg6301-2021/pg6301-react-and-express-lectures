const { QuizGame } = require("../quizGame");

describe("quiz game", () => {
  const game = new QuizGame();
  it("shows not started state", () => {
    expect(game.getState(undefined)).toEqual({ state: "not_started" });
  });

  it("shows state of new game", () => {
    const match = game.startMatch(() => [
      { question: "Q1", alternatives: ["a", "b", "c"], answer: 2 },
    ]);
    expect(game.getState(match)).toEqual({
      state: "ongoing",
      answered: 0,
      score: 0,
      current: { question: "Q1", alternatives: ["a", "b", "c"] },
    });
  });

  it("shows progresses on incorrect answer", () => {
    let match = game.startMatch(() => [
      { question: "Q1", alternatives: ["a", "b", "c"], answer: 2 },
      { question: "Q2", alternatives: ["a", "b", "c"], answer: 2 },
    ]);
    match = game.answerQuestion(match, 1);
    expect(game.getState(match)).toEqual({
      state: "ongoing",
      answered: 1,
      score: 0,
      current: { question: "Q2", alternatives: ["a", "b", "c"] },
    });
  });

  it("increases score on correct answer", () => {
    let match = game.startMatch(() => [
      { question: "Q1", alternatives: ["a", "b", "c"], answer: 2 },
      { question: "Q2", alternatives: ["a", "b", "c"], answer: 2 },
    ]);
    match = game.answerQuestion(match, 2);
    expect(game.getState(match)).toMatchObject({ score: 1 });
  });

  it("finishes game after final question", () => {
    let match = game.startMatch(() => [
      { question: "Q1", alternatives: ["a", "b", "c"], answer: 2 },
      { question: "Q2", alternatives: ["a", "b", "c"], answer: 2 },
    ]);
    match = game.answerQuestion(match, 2);
    match = game.answerQuestion(match, 2);
    expect(game.getState(match)).toEqual({
      state: "complete",
      score: 2,
      answered: 2,
    });
  });

  it("picks some questions", () => {
    const findDuplicates = (arr) =>
      arr.filter((item, index) => arr.indexOf(item) !== index);

    expect(game.pickSome([1, 2, 3, 4, 5], 2)).toHaveLength(2);
    const actual = game.pickSome([1, 2, 3, 4, 5, 6, 7, 8], 4);
    expect(findDuplicates(actual)).toEqual([]);
    expect(game.pickSome([100], 1)).toEqual([100]);
  });
});
