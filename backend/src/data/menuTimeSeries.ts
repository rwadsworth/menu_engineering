import { menuItems, type MenuItem, type Quadrant } from "./menuItems";

export interface MenuItemSnapshot {
  itemName: string;
  category: string;
  weekStart: string;
  weekIndex: number;
  popularity: number;
  profitability: number;
  quadrant: Quadrant;
}

export interface TimeseriesQuery {
  item?: string;
  category?: string;
  start?: string;
  end?: string;
  weeks?: number;
}

export interface DailySeriesQuery {
  item?: string;
  category?: string;
  start?: string;
  end?: string;
  days?: number;
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

function classifyQuadrant(popularity: number, profitability: number): Quadrant {
  if (popularity >= 50 && profitability >= 50) return "Star";
  if (popularity >= 50 && profitability < 50) return "Plowhorse";
  if (popularity < 50 && profitability >= 50) return "Puzzle";
  return "Dog";
}

function clamp(value: number, min = 0, max = 100): number {
  return Math.max(min, Math.min(max, value));
}

function hashString(input: string): number {
  let hash = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return Math.abs(hash >>> 0);
}

function baseDriftForItem(item: MenuItem): { popularity: number; profitability: number } {
  const categoryWeight = hashString(item.category) % 7;
  const itemWeight = hashString(item.name) % 11;
  return {
    popularity: ((categoryWeight - 3) * 0.04) + ((itemWeight - 5) * 0.01),
    profitability: ((itemWeight - 5) * 0.03) - ((categoryWeight - 3) * 0.01),
  };
}

function randomShock(item: MenuItem, weekIndex: number): { popularity: number; profitability: number } {
  const seed = hashString(`${item.name}-${weekIndex}`);
  const popShock = ((seed % 1000) / 1000 - 0.5) * 3;
  const profShock = (((seed >> 8) % 1000) / 1000 - 0.5) * 2.2;
  return { popularity: popShock, profitability: profShock };
}

function startOfWeek(date: Date): Date {
  const copy = new Date(date);
  copy.setHours(0, 0, 0, 0);
  const day = copy.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  copy.setDate(copy.getDate() + diff);
  return copy;
}

function generateSnapshots(weeks = 26): MenuItemSnapshot[] {
  const now = new Date();
  const currentWeekStart = startOfWeek(now);
  const snapshots: MenuItemSnapshot[] = [];

  menuItems.forEach((item) => {
    const drift = baseDriftForItem(item);

    for (let i = weeks - 1; i >= 0; i -= 1) {
      const weekStart = new Date(currentWeekStart);
      weekStart.setDate(currentWeekStart.getDate() - (i * 7));

      const trendFactor = weeks - i;
      const seasonality = Math.sin((trendFactor / 5) + (hashString(item.category) % 4));
      const shock = randomShock(item, i);

      const popularity = Math.round(
        clamp(item.popularity + (trendFactor * drift.popularity) + (seasonality * 4) + shock.popularity)
      );
      const profitability = Math.round(
        clamp(item.profitability + (trendFactor * drift.profitability) + (seasonality * 2.5) + shock.profitability)
      );

      snapshots.push({
        itemName: item.name,
        category: item.category,
        weekStart: weekStart.toISOString().slice(0, 10),
        weekIndex: trendFactor,
        popularity,
        profitability,
        quadrant: classifyQuadrant(popularity, profitability),
      });
    }
  });

  return snapshots.sort((a, b) => {
    if (a.weekStart === b.weekStart) {
      return a.itemName.localeCompare(b.itemName);
    }
    return a.weekStart.localeCompare(b.weekStart);
  });
}

const DEFAULT_WEEKS = 26;
const allSnapshots = generateSnapshots(DEFAULT_WEEKS);

function generateDailySnapshots(days = 30): MenuItemDailySnapshot[] {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const snapshots: MenuItemDailySnapshot[] = [];

  menuItems.forEach((item) => {
    const drift = baseDriftForItem(item);

    for (let i = days - 1; i >= 0; i -= 1) {
      const day = new Date(now);
      day.setDate(now.getDate() - i);

      const dayIndex = days - i;
      const seasonality = Math.sin((dayIndex / 4) + (hashString(item.category) % 4));
      const shock = randomShock(item, dayIndex + 100);

      const popularity = Math.round(
        clamp(item.popularity + (dayIndex * drift.popularity * 0.7) + (seasonality * 3.2) + shock.popularity)
      );
      const profitability = Math.round(
        clamp(item.profitability + (dayIndex * drift.profitability * 0.6) + (seasonality * 1.8) + shock.profitability)
      );

      snapshots.push({
        itemName: item.name,
        category: item.category,
        day: day.toISOString().slice(0, 10),
        dayIndex,
        popularity,
        profitability,
        quadrant: classifyQuadrant(popularity, profitability),
      });
    }
  });

  return snapshots.sort((a, b) => {
    if (a.day === b.day) {
      return a.itemName.localeCompare(b.itemName);
    }
    return a.day.localeCompare(b.day);
  });
}

const DEFAULT_DAYS = 30;
const allDailySnapshots = generateDailySnapshots(DEFAULT_DAYS);

export function getMenuTimeSeries(query: TimeseriesQuery): MenuItemSnapshot[] {
  const requestedWeeks = Number.isFinite(query.weeks) && Number(query.weeks) > 0
    ? Math.min(Number(query.weeks), DEFAULT_WEEKS)
    : DEFAULT_WEEKS;

  const weekSet = new Set(
    [...new Set(allSnapshots.map((point) => point.weekStart))]
      .sort((a, b) => a.localeCompare(b))
      .slice(-requestedWeeks)
  );

  return allSnapshots.filter((point) => {
    if (!weekSet.has(point.weekStart)) return false;
    if (query.item && point.itemName !== query.item) return false;
    if (query.category && point.category !== query.category) return false;
    if (query.start && point.weekStart < query.start) return false;
    if (query.end && point.weekStart > query.end) return false;
    return true;
  });
}

export function getMenuDailySeries(query: DailySeriesQuery): MenuItemDailySnapshot[] {
  const requestedDays = Number.isFinite(query.days) && Number(query.days) > 0
    ? Math.min(Number(query.days), DEFAULT_DAYS)
    : DEFAULT_DAYS;

  const daySet = new Set(
    [...new Set(allDailySnapshots.map((point) => point.day))]
      .sort((a, b) => a.localeCompare(b))
      .slice(-requestedDays)
  );

  return allDailySnapshots.filter((point) => {
    if (!daySet.has(point.day)) return false;
    if (query.item && point.itemName !== query.item) return false;
    if (query.category && point.category !== query.category) return false;
    if (query.start && point.day < query.start) return false;
    if (query.end && point.day > query.end) return false;
    return true;
  });
}
