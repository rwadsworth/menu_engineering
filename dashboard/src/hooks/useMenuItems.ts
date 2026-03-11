import { useState, useEffect } from "react";
import type { MenuItem } from "../data/mockMenuData";

interface UseMenuItemsResult {
  items: MenuItem[];
  loading: boolean;
  error: string | null;
}

export function useMenuItems(): UseMenuItemsResult {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? "";

  useEffect(() => {
    let cancelled = false;

    fetch(`${apiBaseUrl}/api/menu`)
      .then((res) => {
        if (!res.ok) throw new Error(`API error: ${res.status} ${res.statusText}`);
        return res.json() as Promise<MenuItem[]>;
      })
      .then((data) => {
        if (!cancelled) {
          setItems(data);
          setLoading(false);
        }
      })
      .catch((err: unknown) => {
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
