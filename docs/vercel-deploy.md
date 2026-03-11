# Vercel Deployment Guide

This project is a monorepo with two deployable apps:

- Backend API in `backend/`
- Frontend dashboard in `dashboard/`

To get automatic GitHub deployments, create two Vercel projects from the same repository.

## Prerequisites

- GitHub repository connected to Vercel: `rwadsworth/menu_engineering`
- Main branch: `main`

## 1. Deploy Backend Project

1. In Vercel, choose **Add New -> Project**.
2. Import `rwadsworth/menu_engineering`.
3. Set **Root Directory** to `backend`.
4. Build settings:
   - Framework Preset: `Other`
   - Build Command: leave default/empty
   - Output Directory: leave empty
5. Environment variables:
   - `CORS_ORIGIN` = frontend URL (set a temporary value first if frontend URL is not known yet)
6. Deploy.
7. Copy the backend production URL, for example:
   - `https://menu-engineering-api.vercel.app`

## 2. Deploy Frontend Project

1. Create another Vercel project from the same GitHub repository.
2. Set **Root Directory** to `dashboard`.
3. Build settings:
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Environment variables:
   - `VITE_API_BASE_URL` = backend production URL from step 1 (no trailing slash)
5. Deploy.

## 3. Finalize CORS

After frontend deploy is complete, update backend environment variable:

- `CORS_ORIGIN` = exact frontend URL

Then redeploy the backend project.

## 4. Verify Auto-Deploy from GitHub

For both Vercel projects, open **Settings -> Git** and verify:

- Repository is connected to `rwadsworth/menu_engineering`
- Production branch is `main`
- Automatic deployments are enabled

Behavior:

- Push to `main` -> production deployment
- Push to feature branches or PRs -> preview deployment

## 5. Useful Checks

- Backend health check:
  - `GET <BACKEND_URL>/api/menu`
- Frontend runtime check:
  - Open the frontend URL and confirm menu data loads

## Implementation Notes

- Backend serverless entrypoint is defined in `backend/api/index.ts`.
- Backend routing and middleware are in `backend/src/app.ts`.
- Frontend API base URL is read from `VITE_API_BASE_URL` in `dashboard/src/hooks/useMenuItems.ts`.
