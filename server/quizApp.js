const express = require("express");
const { QuizGame } = require("./quizGame");

function quizRouter(questionDb) {
  const router = express.Router();

  const quizGame = new QuizGame();

  router.get("/", (req, res) => {
    res.json(quizGame.getState(req.session.match));
  });

  router.post("/", (req, res) => {
    req.session.match = quizGame.startMatch(() =>
      quizGame.pickSome(questionDb, 4)
    );
    res.json({});
  });

  router.post("/answer", (req, res) => {
    const { answer } = req.body;
    req.session.match = quizGame.answerQuestion(req.session.match, answer);
    res.json({});
  });

  return router;
}

module.exports = {
  quizRouter,
};
