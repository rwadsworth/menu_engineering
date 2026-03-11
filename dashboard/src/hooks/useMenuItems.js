import { useState, useEffect } from "react";
export function useMenuItems() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? "";
    useEffect(() => {
        let cancelled = false;
        fetch(`${apiBaseUrl}/api/menu`)
            .then((res) => {
            if (!res.ok)
                throw new Error(`API error: ${res.status} ${res.statusText}`);
            return res.json();
        })
            .then((data) => {
            if (!cancelled) {
                setItems(data);
                setLoading(false);
            }
        })
            .catch((err) => {
            if (!cancelled) {
                setError(err instanceof Error ? err.message : "Failed to load menu data");
                setLoading(false);
            }
        });
        return () => {
            cancelled = true;
        };
    }, []);
    return { items, loading, error };
}
