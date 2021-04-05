const request = require("supertest");
const express = require("express");

function quizApp() {
  const router = express.Router();

  router.get("/", (req, res) => {
    const state = req.session?.game?.state || "not_started";
    res.json({ state });
  });

  router.post("/", (req, res) => {
    req.session.game = { state: "started" };
    res.status(200).end();
  });

  return router;
}

let app;

describe("quiz api", () => {
  const session = {};
  beforeEach(() => {
    app = express();
    app.use((req, res, next) => {
      req.session = session;
      next();
    });
    app.use("/api/quiz", quizApp());
  });

  it("gives initial empty game", async () => {
    const { state } = (await request(app).get("/api/quiz")).body;
    expect(state).toEqual("not_started");
  });

  it("starts game", async () => {
    expect((await request(app).post("/api/quiz")).status).toEqual(200);
    const { state } = (await request(app).get("/api/quiz")).body;
    expect(state).toEqual("started");
  });
});
