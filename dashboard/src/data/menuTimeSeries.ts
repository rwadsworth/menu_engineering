import type { Quadrant } from "./mockMenuData";

export interface MenuItemSnapshot {
  itemName: string;
  category: string;
  weekStart: string;
  weekIndex: number;
  popularity: number;
  profitability: number;
  quadrant: Quadrant;
}

export interface MenuTimeSeriesResponse {
  snapshots: MenuItemSnapshot[];
  dimensions: {
    items: string[];
    categories: string[];
    weeks: string[];
  };
}

export interface MenuItemDailySnapshot {
  itemName: string;
  category: string;
  day: string;
  dayIndex: number;
  popularity: number;
  profitability: number;
  quadrant: Quadrant;
}

export interface MenuDailySeriesResponse {
  snapshots: MenuItemDailySnapshot[];
  dimensions: {
    items: string[];
    categories: string[];
    days: string[];
  };
}

export interface UseMenuTimeSeriesParams {
  weeks?: number;
  category?: string;
}

export interface UseMenuDailySeriesParams {
  days?: number;
  category?: string;
}
