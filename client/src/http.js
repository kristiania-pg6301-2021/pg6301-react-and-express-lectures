class HttpError extends Error {
  constructor(url, status, statusText) {
    super(`${url}: ${status} ${statusText}`);
  }
}

export async function fetchJSON(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new HttpError(url, response.status, response.statusText);
  }
  return await response.json();
}
