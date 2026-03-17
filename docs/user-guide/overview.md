# User Guide Overview

Menu Engineering is a monorepo analytics app that helps restaurant teams evaluate menu performance and operational opportunities.

## What It Does

- Classifies menu items into four menu-engineering quadrants: Star, Plowhorse, Puzzle, and Dog.
- Tracks item movement over time with weekly and daily trend snapshots.
- Surfaces actionable insights through executive summary KPIs and recommendations.

## Architecture

- `data/`: Python scripts generate deterministic Bella Napoli themed mock data.
- `backend/`: Express + TypeScript API serves menu catalog and time-series endpoints.
- `dashboard/`: React + TypeScript UI renders matrix, trend, migration, and summary views.

## Key API Endpoints

- `GET /api/menu`
- `GET /api/menu/timeseries`
- `GET /api/menu/timeseries/daily`

## Typical Local Workflow

1. Install dependencies (`npm install` and `pip install -r data/requirements.txt`).
2. Generate test data (`npm run generate:data`).
3. Run backend and dashboard (`npm run dev`).
4. Explore executive, matrix, and time-series analytics in the dashboard.
