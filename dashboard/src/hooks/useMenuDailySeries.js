import { useMemo, useEffect, useState } from "react";
export function useMenuDailySeries(params) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const queryString = useMemo(() => {
        const query = new URLSearchParams();
        if (params.days)
            query.set("days", String(params.days));
        if (params.category && params.category !== "All")
            query.set("category", params.category);
        return query.toString();
    }, [params.category, params.days]);
    useEffect(() => {
        let cancelled = false;
        setLoading(true);
        setError(null);
        fetch(`/api/menu/timeseries/daily${queryString ? `?${queryString}` : ""}`)
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
                setError(err instanceof Error ? err.message : "Failed to load daily movement data");
                setLoading(false);
            }
        });
        return () => {
            cancelled = true;
        };
    }, [queryString]);
    return { data, loading, error };
}
