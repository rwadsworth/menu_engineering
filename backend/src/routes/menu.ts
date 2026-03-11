import { Router, Request, Response } from "express";
import { menuItems } from "../data/menuItems";
import { getMenuDailySeries, getMenuTimeSeries } from "../data/menuTimeSeries";

const router = Router();

router.get("/", (_req: Request, res: Response) => {
  res.json(menuItems);
});

router.get("/timeseries", (req: Request, res: Response) => {
  const item = typeof req.query.item === "string" ? req.query.item : undefined;
  const category = typeof req.query.category === "string" ? req.query.category : undefined;
  const start = typeof req.query.start === "string" ? req.query.start : undefined;
  const end = typeof req.query.end === "string" ? req.query.end : undefined;
  const weeksParam = typeof req.query.weeks === "string" ? Number(req.query.weeks) : undefined;

  const snapshots = getMenuTimeSeries({
    item,
    category,
    start,
    end,
    weeks: weeksParam,
  });

  const items = [...new Set(snapshots.map((point) => point.itemName))];
  const categories = [...new Set(snapshots.map((point) => point.category))];
  const weeks = [...new Set(snapshots.map((point) => point.weekStart))].sort((a, b) => a.localeCompare(b));

  res.json({
    snapshots,
    filters: {
      item,
      category,
      start,
      end,
      weeks: weeksParam,
    },
    dimensions: {
      items,
      categories,
      weeks,
    },
  });
});

router.get("/timeseries/daily", (req: Request, res: Response) => {
  const item = typeof req.query.item === "string" ? req.query.item : undefined;
  const category = typeof req.query.category === "string" ? req.query.category : undefined;
  const start = typeof req.query.start === "string" ? req.query.start : undefined;
  const end = typeof req.query.end === "string" ? req.query.end : undefined;
  const daysParam = typeof req.query.days === "string" ? Number(req.query.days) : undefined;

  const snapshots = getMenuDailySeries({
    item,
    category,
    start,
    end,
    days: daysParam,
  });

  const items = [...new Set(snapshots.map((point) => point.itemName))];
  const categories = [...new Set(snapshots.map((point) => point.category))];
  const days = [...new Set(snapshots.map((point) => point.day))].sort((a, b) => a.localeCompare(b));

  res.json({
    snapshots,
    filters: {
      item,
      category,
      start,
      end,
      days: daysParam,
    },
    dimensions: {
      items,
      categories,
      days,
    },
  });
});

export default router;
