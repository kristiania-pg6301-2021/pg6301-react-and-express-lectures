export class UserApi {
  constructor() {
    this.server = "http://localhost:3000";
  }

  async fetchUser(accessToken) {
    return fetchJson(this.server + "/api/user", {
      headers: {
        ...(accessToken ? { Authorization: "Bearer " + accessToken } : {}),
      },
    });
  }

  async postUser(user) {
    const res = await fetch(this.server + "/api/user", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });
    checkResponse(res);
  }
}

export async function fetchJson(url, { headers } = { headers: {} }) {
  console.log("fetching", url);
  const res = await fetch(url, {
    headers: {
      ...{ Accept: "application/json" },
      ...headers,
    },
  });
  console.log(url, res);
  checkResponse(res);
  return await res.json();
}

function checkResponse(res) {
  if (!res.ok) {
    const error = new Error("Res failed: " + res.status);
    error.status = res.status;
    throw error;
  }
}
