class HttpError extends Error {
  constructor(url, status, statusText) {
    super(`${url}: ${status} ${statusText}`);
  }
}

async function fetchJSON(url) {
  let response = await fetch(url);
  if (!response.ok) {
    throw new HttpError(url, response.status, response.statusText);
  }
  return await response.json();
}

export class QuizApplicationApi {
  async getUserinfo() {
    return await fetchJSON("https://webapps.kristiania.no:3000/api/userinfo");
  }
}
