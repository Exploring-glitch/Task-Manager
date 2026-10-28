# Task Manager

A MERN task management app where admins create and assign work while team members track their
own tasks. Built with React + Vite + Tailwind on the frontend and Express + MongoDB on the
backend.

**Live app:** https://task-manager-pi-eight-72.vercel.app/

---

## Features

### Admins
- Sign up with an admin invite token
- Create, edit and delete tasks, including checklist items and attachment links
- Assign tasks to one or more team members
- Dashboard with task distribution, priority levels and recent activity
- Team member overview with per-status task counts
- Excel exports for tasks and members

### Members
- Personal dashboard scoped to assigned tasks
- Filter tasks by status and open task details
- Tick off checklist items, which recalculates progress and status
- Read-only access to everything else

### Security
- JWT stored in an `httpOnly` cookie (never returned in the JSON response)
- `bcrypt` password hashing
- Role based route guards on the server and client
- Task level ownership checks for members
- CORS restricted to configured origins
- Rate limiting on auth and upload endpoints
- Image uploads restricted to JPEG/PNG/WebP and 2 MB

---

## Project structure

```
Task-Manager/
├── backend/
│   ├── app.js                 # express app (no listen, used by tests)
│   ├── server.js              # bootstrap: db connection + graceful shutdown
│   ├── src/
│   │   ├── config/            # env, cookies, CORS, mongo, cloudinary
│   │   ├── controller/        # request handlers
│   │   ├── dao/               # data access + aggregations
│   │   ├── middleware/        # auth, errors, rate limit, uploads, headers
│   │   ├── models/            # mongoose schemas
│   │   ├── routes/            # express routers
│   │   └── utils/             # validation, errors, excel, jwt
│   └── tests/                 # node:test API smoke tests
└── frontend/
    ├── src/
    │   ├── api/               # axios wrappers per resource
    │   ├── components/        # shared UI
    │   ├── context/           # UserContext + UserProvider
    │   ├── hooks/             # useUser, useTasks, useDashboardData
    │   ├── pages/             # auth, admin and member screens
    │   ├── routes/            # route guards + home route helper
    │   └── util/              # axios instance, task metadata, downloads
    └── vite.config.js         # dev proxy to the local API
```

---

## Getting started

### Requirements
- Node.js 20+
- A MongoDB database (local or Atlas)
- A Cloudinary account (only needed for profile photo uploads)

### 1. Backend

```bash
cd backend
npm install
cp .envExample .env      # Windows: copy .envExample .env
```

Fill in `.env`:

| Variable | Description |
| --- | --- |
| `PORT` | Port the API listens on (default `3000`) |
| `NODE_ENV` | `development` or `production` |
| `MONGODB_URI` | MongoDB connection string |
| `CLIENT_URL` | Comma separated list of allowed frontend origins, e.g. `http://localhost:5173` |
| `JWT_SECRET` | Long random string, e.g. output of `openssl rand -base64 48` |
| `JWT_EXPIRES_IN` | Token lifetime, e.g. `7d` |
| `ADMIN_INVITE_TOKEN` | Token required to register an admin account |
| `BASE_URL` | Public URL of the API |
| `CLOUDINARY_CLOUD_NAME` / `CLOUDINARY_API_KEY` / `CLOUDINARY_API_SECRET` | Cloudinary credentials |

```bash
npm run dev      # nodemon on http://localhost:3000
npm start        # production start
npm test         # node:test API smoke tests
npm run lint
npm run format
```

### 2. Frontend

```bash
cd frontend
npm install
```

`frontend/.env.development` already points `VITE_API_URL` at `/`, and Vite proxies `/api` to
`http://localhost:3000`. For a deployed build set `VITE_API_URL` to the public API URL.

```bash
npm run dev      # http://localhost:5173
npm run build
npm run lint
npm run preview
```

### 3. First login

1. Open http://localhost:5173/auth/signup
2. Enter your details and paste `ADMIN_INVITE_TOKEN` to create an admin account
3. Leave the token empty to create a regular member account
4. Create tasks from **Manage Tasks** and assign them to members

---

## API overview

All routes are prefixed with `/api`. Authentication uses the `token` cookie.

| Method | Route | Access |
| --- | --- | --- |
| `GET` | `/health` | public |
| `POST` | `/auth/signup` | public |
| `POST` | `/auth/login` | public |
| `POST` | `/auth/logout` | public |
| `GET` / `PUT` | `/auth/profile` | signed in |
| `POST` | `/auth/upload-image` | signed in |
| `GET` | `/tasks` | signed in (scoped for members) |
| `GET` | `/tasks/:id` | admin or assignee |
| `POST` | `/tasks/create-task` | admin |
| `PUT` | `/tasks/update-task/:id` | admin |
| `PUT` | `/tasks/update-task-status/:id` | admin or assignee |
| `PUT` | `/tasks/update-task-todo/:id` | admin or assignee |
| `DELETE` | `/tasks/delete-task/:id` | admin |
| `GET` | `/tasks/dashboard` | admin |
| `GET` | `/tasks/dashboard-user-data` | signed in |
| `GET` | `/users` | admin |
| `GET` | `/users/:id` | admin or self |
| `GET` | `/reports/tasks` / `/reports/users` | admin |

---

## Security notes

- `backend/.env` is gitignored. Never commit real credentials.
- **Credentials that were committed in earlier revisions of this repository must be considered
  leaked.** Rotate the MongoDB user password, the Cloudinary API key/secret, `JWT_SECRET` and
  `ADMIN_INVITE_TOKEN` before deploying this version. Rotating `JWT_SECRET` signs everyone out,
  which is the intent.
- Cookies are `httpOnly` and switch to `secure` + `sameSite=none` automatically when the request
  arrives over HTTPS, so the API also works behind a proxy without `NODE_ENV=production`.
- Rate limiting is in-memory and per instance. Move it to a shared store if the API is ever
  scaled horizontally.

---

## License

ISC
