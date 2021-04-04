import { fetchJSON } from "./http";

export class QuizApplicationApi {
  async getUserinfo() {
    const { access_token } =
      JSON.parse(localStorage.getItem("authorization")) || {};
    return await fetchJSON("https://webapps.kristiania.no:3000/api/userinfo", {
      headers: {
        ...(access_token ? { Authorization: `Bearer ${access_token}` } : {}),
      },
    });
  }
}
