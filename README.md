#### # 📝 NoteHub

NoteHub is a multi-page application for creating, viewing, and managing notes. Built using **Next.js App Router**, **TypeScript**, **React Query (TanStack)**, **Axios**, and **CSS Modules**.

![NoteHub Screenshot](https://github.com/Ded-Goit/06-notehub-nextjs/blob/main/public/note_hub.png)

## 🚀 Features

- 🔐 **Authentication & Authorization** — register, sign in, session check, and sign out
- 🗂️ **Protected Routes** — `/profile` and `/notes` are accessible only to authenticated users
- 🔄 **SSR & CSR** — combines server-side and client-side rendering for optimal performance
- 🍪 **Tokens in Cookies** — all API requests send secure tokens via cookies
- ⚡ **TanStack Query** — handles API state, caching, and mutations on the client
- 🧩 **App Router** — routes organized with layout scopes (`(auth routes)`, `(private-routes)`)
- 🎨 **CSS Modules** — clean, modular component styling
- ✅ **TypeScript** — strict type safety for all components and API logic
- ⚙️ **Axios Instance** — separate client/server configuration with `withCredentials` for cookies
- 🔄 **Middleware Protection** — Next.js `middleware.ts` redirects unauthorized users
- 🗝️ **Zustand Store** — global state management for auth status and user data
- ✏️ **Profile Edit** — edit your profile directly in a secure route

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

## 💡 How Drafts Work

NoteHub uses [Zustand](https://github.com/pmndrs/zustand) with the `persist` middleware to store your note draft in `localStorage`. This means:

- Your unsaved work is always safe
- The draft is loaded automatically when you revisit `/notes/action/create`
- The draft is cleared automatically when you successfully create a note

## ⚙️ Technologies

- [Next.js 15+ (App Router)](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [TanStack Query (React Query)](https://tanstack.com/query/latest)
- [Axios](https://axios-http.com/)
- [Zustand + Persist](https://github.com/pmndrs/zustand)
- [CSS Modules](https://github.com/css-modules/css-modules)
- [React Spinners](https://www.davidhu.io/react-spinners/)

## 📌 Main Pages

| Route           | Type    | Description                    |
| --------------- | ------- | ------------------------------ |
| `/sign-in`      | Public  | User login page                |
| `/sign-up`      | Public  | User registration page         |
| `/profile`      | Private | User profile page              |
| `/profile/edit` | Private | Edit user profile              |
| `/notes`        | Private | Notes list & management (CRUD) |

## 📡 API Endpoints

Base URL: `https://notehub-api.goit.study`

- `POST /auth/register` — register new user
- `POST /auth/login` — sign in user
- `POST /auth/logout` — log out user
- `GET /auth/session` — check active session
- `GET /users/me` — get user profile
- `PATCH /users/me` — update user profile
- `GET /notes` — get list of notes
- `POST /notes` — create note
- `DELETE /notes/:id` — delete note

Most requests require valid cookies for authorization.

---

## ⚙️ Getting Started

1️⃣ Clone the repository  
2️⃣ Install dependencies

```bash
npm install
3️⃣ Add .env file:

env
NEXT_PUBLIC_API_URL=http://localhost:3000
4️⃣ Run the development server:

bash
npm run dev
5️⃣ Open http://localhost:3000 in your browser.

✅ Deployment
Deploy easily on Vercel.
Make sure NEXT_PUBLIC_API_URL points to your deployed Vercel URL.

📄 License
MIT License.
## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

```
