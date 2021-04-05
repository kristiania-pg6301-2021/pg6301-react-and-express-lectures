import { fetchJSON } from "./http";

function authorization() {
  const { access_token } =
    JSON.parse(localStorage.getItem("authorization")) || {};
  return access_token ? { Authorization: `Bearer ${access_token}` } : {};
}

export class QuizApplicationApi {
  async getUserinfo() {
    return await fetchJSON("https://webapps.kristiania.no:3000/api/userinfo", {
      headers: {
        ...authorization(),
      },
    });
  }

  async fetchQuiz() {
    return await fetchJSON("https://webapps.kristiania.no:3000/api/quiz", {
      credentials: "include",
      headers: {
        ...authorization(),
      },
    });
  }

  async startQuiz() {
    return await fetchJSON("https://webapps.kristiania.no:3000/api/quiz", {
      method: "POST",
      credentials: "include",
      headers: {
        ...authorization(),
      },
    });
  }

  async answerQuestion(answer) {
    return await fetchJSON(
      "https://webapps.kristiania.no:3000/api/quiz/answer",
      {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ answer }),
        headers: {
          "Content-Type": "application/json",
          ...authorization(),
        },
      }
    );
  }
}
