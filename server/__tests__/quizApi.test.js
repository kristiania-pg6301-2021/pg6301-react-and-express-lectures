const { quizApp, pickSome } = require("../quizApp");

const request = require("supertest");
const express = require("express");
const bodyParser = require("body-parser");

let app;

describe("quiz api", () => {
  const session = {};

  const question = { question: "Q", alternatives: ["A", "B"], answer: 1 };
  const gameApi = {
    selectQuestions: () => [1, 2, 3],
    getQuestion: () => question,
  };

  beforeEach(() => {
    app = express();
    app.use((req, res, next) => {
      req.session = session;
      next();
    });
    app.use(bodyParser.json());
    app.use("/api/quiz", quizApp(gameApi));
  });

  it("gives initial empty game", async () => {
    const { state } = (await request(app).get("/api/quiz")).body;
    expect(state).toEqual("not_started");
  });

  it("starts game", async () => {
    expect((await request(app).post("/api/quiz")).status).toEqual(200);
    const { state, score } = (await request(app).get("/api/quiz")).body;
    expect(state).toEqual("started");
    expect(score).toEqual(0);
  });

  it("generates a question", async () => {
    gameApi.selectQuestions = () => [5, 3, 3, 1];
    gameApi.getQuestion = () => ({
      question: "What is red",
      alternatives: ["a", "b", "c"],
      answer: 1,
    });
    expect((await request(app).post("/api/quiz")).status).toEqual(200);
    expect((await request(app).get("/api/quiz")).body).toEqual({
      question: "What is red",
      alternatives: ["a", "b", "c"],
      score: 0,
      current: 0,
      state: "started",
    });
  });

  it("increases score on correct answer", async () => {
    session.game = { questions: [4, 3, 2], current: 1, score: 0 };
    expect(
      (
        await request(app).post("/api/quiz/answer").send({
          answer: question.answer,
        })
      ).status
    ).toEqual(200);
    const { current, score } = (await request(app).get("/api/quiz")).body;
    expect(current).toEqual(2);
    expect(score).toEqual(1);
  });

  it("doesn't increment score on wrong answer", async () => {
    session.game = { questions: [4, 3, 2], current: 1, score: 0 };
    expect(
      (
        await request(app).post("/api/quiz/answer").send({
          answer: -1,
        })
      ).status
    ).toEqual(200);
    const { current, score } = (await request(app).get("/api/quiz")).body;
    expect(current).toEqual(2);
    expect(score).toEqual(0);
  });

  it("picks some questions", () => {
    const findDuplicates = (arr) =>
      arr.filter((item, index) => arr.indexOf(item) !== index);

    expect(pickSome([1, 2, 3, 4, 5], 2)).toHaveLength(2);
    const actual = pickSome([1, 2, 3, 4, 5, 6, 7, 8], 4);
    expect(findDuplicates(actual)).toEqual([]);
  });
});
