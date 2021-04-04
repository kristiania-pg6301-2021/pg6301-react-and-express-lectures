class HttpError extends Error {
  constructor(url, status, statusText) {
    super(`${url}: ${status} ${statusText}`);
  }
}

export async function fetchJSON(url, options) {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new HttpError(url, response.status, response.statusText);
  }
  return await response.json();
}
