export class HttpError extends Error {
    constructor(res) {
        super("Failed to access " + res.url + ": " + res.status + " " + res.statusText);
        this.status = res.status;
    }

    status() {
        return this.status;
    }

}