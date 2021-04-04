import { fetchJSON } from "./http";

export class QuizApplicationApi {
  async getUserinfo() {
    return await fetchJSON("https://webapps.kristiania.no:3000/api/userinfo");
  }
}
