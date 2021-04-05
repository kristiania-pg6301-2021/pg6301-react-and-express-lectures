const request = require("supertest");
const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ state: "not_started" });
});

const app = express();
app.use("/api/quiz", router);

describe("quiz api", () => {
  it("gives initial empty game", async () => {
    const r = await request(app).get("/api/quiz");
    expect(r.status).toEqual(200);
    const { state } = r.body;
    expect(state).toEqual("not_started");
  });
});
