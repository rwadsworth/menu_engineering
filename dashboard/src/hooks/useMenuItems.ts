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

  useEffect(() => {
    let cancelled = false;

    fetch("/api/menu")
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
