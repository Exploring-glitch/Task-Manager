# Task Manager — Frontend

React 19 + Vite + Tailwind client for the Task Manager API.

## Scripts

```bash
npm run dev      # dev server on http://localhost:5173
npm run build    # production build to dist/
npm run preview  # serve the production build
npm run lint     # eslint
npm test         # node:test unit tests
```

## Environment

| Variable | Purpose |
| --- | --- |
| `VITE_API_URL` | Base URL for API requests |

- `.env.development` sets `VITE_API_URL=/` so requests go through the Vite proxy
  (`/api` → `http://localhost:3000`, configured in `vite.config.js`). This keeps cookies
  first-party in local development.
- For production, set `VITE_API_URL` to the deployed API origin. The API must list the frontend
  origin in `CLIENT_URL` for CORS.

## Structure

| Path | Contents |
| --- | --- |
| `src/api/` | axios calls grouped by resource |
| `src/components/` | shared UI (cards, charts, inputs, layouts, badges) |
| `src/context/` | `UserContext` + `UserProvider` (session bootstrap) |
| `src/hooks/` | `useUser`, `useTasks`, `useDashboardData` |
| `src/pages/` | auth, admin and member screens |
| `src/routes/` | `PrivateRoute`, `PublicOnlyRoute`, `homeRoute` |
| `src/util/` | axios instance, task metadata, file downloads |

## Session flow

1. `UserProvider` calls `GET /api/auth/profile` on mount.
2. `PrivateRoute` shows a loader while that request is in flight, redirects anonymous visitors to
   `/auth/login`, and sends users to the dashboard matching their role.
3. Task editing lives at `/admin/tasks/:id/edit`; the page reads the id from the route instead of
   router state.
