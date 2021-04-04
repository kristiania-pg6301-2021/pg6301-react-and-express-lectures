export class QuizApplicationApi {
  getUserinfo() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() < 0.25) {
          return reject("IO error");
        }
        resolve({
          user: {
            username: "Hello",
            identifier: "hello@example.com",
          },
        });
      }, 200);
    });
  }
}
