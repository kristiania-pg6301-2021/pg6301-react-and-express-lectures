import { useEffect, useState } from "react";

export function useLoader(loadingFunction) {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  async function reload() {
    setData(undefined);
    setLoading(true);
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

  return { data, error, loading, reload };
}