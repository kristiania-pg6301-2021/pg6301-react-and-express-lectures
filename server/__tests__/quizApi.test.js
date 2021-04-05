const request = require("supertest");
const express = require("express");
const bodyParser = require("body-parser");

function quizApp(gameApi) {
  const router = express.Router();

  router.get("/", (req, res) => {
    if (!req.session?.game) {
      return res.json({ state: "not_started" });
    }
    const { state, questions, current, score } = req.session.game;
    const { question, alternatives } = gameApi.getQuestion(questions[current]);
    res.json({ state, score, question, alternatives, current });
  });

  router.post("/", (req, res) => {
    req.session.game = {
      state: "started",
      questions: gameApi.selectQuestions(),
      current: 0,
      score: 0,
    };
    res.status(200).end();
  });

  router.post("/answer", (req, res) => {
    const { answer } = req.body;
    const { questions, current, score } = req.session.game;
    if (gameApi.getQuestion(questions[current]).answer === answer) {
      req.session.game.score = score + 1;
    }
    req.session.game.current = current + 1;
    res.status(200).end();
  });

  return router;
}

function pickSome(array, length) {
  if (array.length < length) {
    throw new Error("Array too short");
  }
  const copy = [...array];
  const result = [];
  while (result.length < length) {
    const index = Math.floor(Math.random() * copy.length);
    result.push(copy.splice(index, 1));
  }
  return result;
}

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
