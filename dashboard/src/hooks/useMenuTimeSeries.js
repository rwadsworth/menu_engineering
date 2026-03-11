import { useMemo, useEffect, useState } from "react";
export function useMenuTimeSeries(params) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? "";
  const queryString = useMemo(() => {
    const query = new URLSearchParams();
    if (params.weeks) query.set("weeks", String(params.weeks));
    if (params.category && params.category !== "All")
      query.set("category", params.category);
    return query.toString();
  }, [params.category, params.weeks]);
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetch(
      `${apiBaseUrl}/api/menu/timeseries${queryString ? `?${queryString}` : ""}`,
    )
      .then((res) => {
        if (!res.ok)
          throw new Error(`API error: ${res.status} ${res.statusText}`);
        return res.json();
      })
      .then((response) => {
        if (!cancelled) {
          setData(response);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Failed to load time-series data",
          );
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [apiBaseUrl, queryString]);
  return { data, loading, error };
}
