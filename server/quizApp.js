const express = require("express");

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
    res.json({});
  });

  router.post("/answer", (req, res) => {
    const { answer } = req.body;
    const { questions, current, score } = req.session.game;
    if (gameApi.getQuestion(questions[current]).answer === answer) {
      req.session.game.score = score + 1;
    }
    req.session.game.current = current + 1;
    res.json({});
  });

  return router;
}

module.exports = {
  quizApp,
  pickSome,
};
