export async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(
      `Something went wrong loading ${res.url}: ${res.statusText}`
    );
  }
  return await res.json();
}

export async function postJSON(url, { json, method }) {
  const res = await fetch(url, {
    method,
    body: JSON.stringify(json),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    throw new Error(
      `Something went wrong loading ${res.url}: ${res.statusText}`
    );
  }
  return await res.json();
}
