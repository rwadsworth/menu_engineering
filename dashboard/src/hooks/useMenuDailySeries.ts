import { useMemo, useEffect, useState } from "react";
import type { MenuDailySeriesResponse, UseMenuDailySeriesParams } from "../data/menuTimeSeries";

interface UseMenuDailySeriesResult {
  data: MenuDailySeriesResponse | null;
  loading: boolean;
  error: string | null;
}

export function useMenuDailySeries(params: UseMenuDailySeriesParams): UseMenuDailySeriesResult {
  const [data, setData] = useState<MenuDailySeriesResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? "";

  const queryString = useMemo(() => {
    const query = new URLSearchParams();

    if (params.days) query.set("days", String(params.days));
    if (params.category && params.category !== "All") query.set("category", params.category);

    return query.toString();
  }, [params.category, params.days]);

  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    setError(null);

    fetch(`${apiBaseUrl}/api/menu/timeseries/daily${queryString ? `?${queryString}` : ""}`)
      .then((res) => {
        if (!res.ok) throw new Error(`API error: ${res.status} ${res.statusText}`);
        return res.json() as Promise<MenuDailySeriesResponse>;
      })
      .then((response) => {
        if (!cancelled) {
          setData(response);
          setLoading(false);
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load daily movement data");
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [apiBaseUrl, queryString]);

  return { data, loading, error };
}
