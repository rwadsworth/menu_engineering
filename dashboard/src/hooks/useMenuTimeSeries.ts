import { useMemo, useEffect, useState } from "react";
import type { MenuTimeSeriesResponse, UseMenuTimeSeriesParams } from "../data/menuTimeSeries";

interface UseMenuTimeSeriesResult {
  data: MenuTimeSeriesResponse | null;
  loading: boolean;
  error: string | null;
}

export function useMenuTimeSeries(params: UseMenuTimeSeriesParams): UseMenuTimeSeriesResult {
  const [data, setData] = useState<MenuTimeSeriesResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? "";

  const queryString = useMemo(() => {
    const query = new URLSearchParams();

    if (params.weeks) query.set("weeks", String(params.weeks));
    if (params.category && params.category !== "All") query.set("category", params.category);

    return query.toString();
  }, [params.category, params.weeks]);

  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    setError(null);

    fetch(`${apiBaseUrl}/api/menu/timeseries${queryString ? `?${queryString}` : ""}`)
      .then((res) => {
        if (!res.ok) throw new Error(`API error: ${res.status} ${res.statusText}`);
        return res.json() as Promise<MenuTimeSeriesResponse>;
      })
      .then((response) => {
        if (!cancelled) {
          setData(response);
          setLoading(false);
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load time-series data");
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [apiBaseUrl, queryString]);

  return { data, loading, error };
}
