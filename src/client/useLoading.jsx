import { useEffect, useState } from "react";

export function useLoading(loadingFunction) {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();

  async function reload() {
    setLoading(true);
    setData(undefined);
    setError(undefined);
    try {
      setData(await loadingFunction());
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(reload, []);

  return { error, loading, data, reload };
}
