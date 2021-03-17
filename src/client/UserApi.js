export class UserApi {
  constructor() {
    this.server = "http://localhost:3000";
  }

  async fetchUser() {
    const res = await fetch(this.server + "/api/user");
    this.checkResponse(res);
    return await res.json();
  }

  async postUser(user) {
    const res = await fetch(this.server + "/api/user", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });
    this.checkResponse(res);
  }

  checkResponse(res) {
    if (!res.ok) {
      throw new Error("Res failed: " + res.status);
    }
  }
}
