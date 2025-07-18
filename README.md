#### # 📝 NoteHub

**NoteHub** is a multi-page note-taking app for creating, viewing, and managing your notes.  
Built with **Next.js App Router**, **TypeScript**, **TanStack Query**, **Axios**, **Zustand**, and **CSS Modules**.

![NoteHub Screenshot](https://raw.githubusercontent.com/Ded-Goit/09-auth/main/public/note_hub.png)

## 🚀 Features

- 🔐 **Authentication & Authorization** — register, sign in, session check, and sign out
- 🗂️ **Protected Routes** — `/profile` and `/notes` are accessible only to authenticated users
- ⚙️ **Middleware Protection** — `middleware.ts` automatically redirects unauthorized users
- 🔄 **SSR & CSR** — combines server-side and client-side rendering for better performance
- 🍪 **Tokens in Cookies** — `accessToken` and `refreshToken` are stored in secure HTTP-only cookies
- ⚡ **TanStack Query** — handles API state, caching, and mutations
- 🧩 **App Router** — routes organized with layout scopes (`(auth routes)`, `(private-routes)`)
- 🎨 **CSS Modules** — modular styling for all UI components
- ✅ **TypeScript** — full type safety across the project
- 🔑 **Zustand Store** — global state for authentication and user data
- ✏️ **Profile Edit** — edit your profile securely inside protected routes

## 🗂 Project structure

           09-auth/
           ├── 📁app/         # App Router: pages, layouts, private and auth routes
           │ ├──  (auth routes)/ # Public routes: sign-in and sign-up
           │ ├──  (private-routes)/ # Private routes: profile and notes
           │ └──  api/ # Server routes for auth and notes API
           ├── 📁components/  # Reusable UI components
           ├── 📁lib/         # API logic, Zustand store
           │ ├──  api/ # api.ts, clientApi.ts, serverApi.ts
           │ └──  store/ # Zustand store for auth state
           ├── 📁public/      # Static files (favicon, images, screenshots)
           ├── 📁types/        # Shared TypeScript types (User, Note)
           ├── 📄middleware.ts # Middleware for route protection
           ├── 📄.gitignore        # List files/folders that Git ignores
           ├── 📄.prettierrс       # Prettier configuration
           ├── 📄README.md         # Project documentation and setup instructions.
           ├── 📄eslint.config.mjs # ESLint configuration for code quality checking
           ├── 📄next.config.ts    # Next.js configuration
           ├── 📄package-lock.json # Automatically generated dependency file
           ├── 📄package.json      # Main dependency, script, and project description file
           └── 📄tsconfig.json     # Configuration for TypeScript compiler

---

## 📌 Main Pages

| Route           | Type    | Description                    |
| --------------- | ------- | ------------------------------ |
| `/sign-in`      | Public  | User login page                |
| `/sign-up`      | Public  | User registration page         |
| `/profile`      | Private | User profile page              |
| `/profile/edit` | Private | Edit user profile              |
| `/notes`        | Private | Notes list & management (CRUD) |

---

## 📡 API Endpoints

**Base URL:** `{YOUR_SITE_URL}/api`

| Method | Endpoint         | Description              |
| ------ | ---------------- | ------------------------ |
| POST   | `/auth/register` | Register a new user      |
| POST   | `/auth/login`    | Sign in user             |
| POST   | `/auth/logout`   | Log out user             |
| GET    | `/users/me`      | Get current user profile |
| PATCH  | `/users/me`      | Update user profile      |
| GET    | `/notes`         | Get list of notes        |
| POST   | `/notes`         | Create a note            |
| DELETE | `/notes/:id`     | Delete a note            |

> 🔒 **Most requests require valid cookies for authentication.**

---

## 🔑 How Authentication Works

- After sign-in, the server sets `accessToken` and `refreshToken` as HTTP-only cookies.
- All protected routes check for a valid `accessToken`.
- If the `accessToken` expires, the `middleware.ts` uses the `refreshToken` to renew the session automatically.

---

## 💡 How Drafts Work

NoteHub uses [Zustand](https://github.com/pmndrs/zustand) with the `persist` middleware to store your note drafts in `localStorage`. This means:

- Your unsaved drafts are safe, even if you reload the page.
- Drafts auto-load when you revisit `/notes/action/create`.
- Drafts clear automatically once a note is successfully created.

---

## ⚙️ Technologies

- [Next.js 15+ (App Router)](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [TanStack Query (React Query)](https://tanstack.com/query/latest)
- [Axios](https://axios-http.com/)
- [Zustand + Persist](https://github.com/pmndrs/zustand)
- [CSS Modules](https://github.com/css-modules/css-modules)
- [React Spinners](https://www.davidhu.io/react-spinners/)

---

## ⚙️ Requirements

- Node.js >= 18
- npm >= 9

---

## 🔑 Environment Variables

Create `.env.local` at the root of your project:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
# Example for production:
# NEXT_PUBLIC_API_URL=https://YOUR_DEPLOYED_URL.vercel.app
```

✅ Getting Started
1️⃣ Clone the repository
2️⃣ Install dependencies
bash
npm install
3️⃣ Add .env.local
4️⃣ Run the development server
bash
npm run dev
5️⃣ Open http://localhost:3000 in your browser

🧹 Lint & Format
bash
npm run lint
npm run format
⚡ Deployment
Deploy easily on Vercel.
Make sure NEXT_PUBLIC_API_URL in your environment variables points to your deployed domain.

⚠️ Known Issues
No password reset flow implemented yet.

Refresh token rotation might need additional route handlers for full auto-renew.

📄 License
MIT License.

📚 Learn More
Next.js Documentation

Learn Next.js

Next.js GitHub

✅ Live Demo
👉 Deploy your NoteHub in minutes — Deploy on Vercel
