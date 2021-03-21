class HttpError extends Error {
  constructor(url, res) {
    super(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
    this.status = res.status;
  }
}

function checkError(res, url) {
  if (!res.ok) {
    throw new HttpError(url, res);
  }
}

export async function fetchJson(url) {
  const res = await fetch(url);
  checkError(res, url);
  return await res.json();
}

export async function postJson(url, json) {
  const res = await fetch(url, {
    body: JSON.stringify(json),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  checkError(res, url);
}
