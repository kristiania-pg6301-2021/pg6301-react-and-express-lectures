class HttpError extends Error {
  constructor(url, res) {
    super(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
    this.status = res.status;
  }
}

export async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new HttpError(url, res);
  }
  return await res.json();
}
