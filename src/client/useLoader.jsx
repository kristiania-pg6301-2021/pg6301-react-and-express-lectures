import { useEffect, useState } from "react";

export function useLoader(loader, deps) {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState();

  useEffect(async () => {
    setLoading(true);
    setData(undefined);
    setError(undefined);
    try {
      setData(await loader());
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, deps);

  return { data, error, loading };
}