# 🎓 TrackerPro — Global Study & Curriculum Tracker

A **full-stack SaaS application** built for students and professionals to create custom curriculums, dynamically manage subjects & tasks, track daily progress, and visualize learning analytics — all in real-time.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?logo=mongodb)](https://mongodb.com/atlas)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔐 **Authentication** | Secure email/password auth via NextAuth.js with JWT sessions |
| 📚 **Dynamic Curriculum** | Add/remove sections, subjects, and tasks on the fly |
| ✅ **Progress Tracking** | Check off tasks with auto-debounced syncing to MongoDB |
| 📊 **Analytics Dashboard** | Recharts-powered donut charts, completion %, and velocity stats |
| 🌙 **Dark/Light Mode** | Seamless theme switching via `next-themes` |
| 🔒 **Zod Validation** | Strict `.strict()` schema enforcement on all API payloads |
| 🛡️ **Security Headers** | HSTS, X-Frame-Options, X-XSS-Protection via Edge Middleware |
| ⚡ **Optimistic UI** | TanStack React Query with instant client-side cache updates |
| 🤖 **AI Generation Stub** | Simulated LLM endpoint for future AI-powered curriculum generation |

---

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router, Server Components)
- **Language:** TypeScript
- **Database:** MongoDB Atlas + Mongoose ODM
- **Auth:** NextAuth.js (Credentials Provider, JWT Strategy)
- **Styling:** Tailwind CSS + Framer Motion animations
- **Charts:** Recharts (PieChart, Donut, Tooltip, Legend)
- **State:** TanStack React Query (global caching, optimistic mutations)
- **Validation:** Zod (strict schema enforcement)
- **Testing:** Vitest + React Testing Library + Playwright E2E
- **Icons:** Lucide React

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (or local MongoDB)

### 1. Clone the repository
```bash
git clone https://github.com/Aadiaditya9421/Study-Tracker.git
cd Study-Tracker
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Create a `.env.local` file in the project root:
```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/study-tracker
NEXTAUTH_SECRET=your_secret_key_here
NEXTAUTH_URL=http://localhost:3000
```

### 4. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for production
```bash
npm run build
npm start
```

---

## 🧪 Testing

```bash
# Run unit & integration tests
npx vitest run

# Run E2E browser tests
npx playwright test
```

---

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── auth/          # NextAuth + Registration endpoints
│   │   ├── plan/          # Curriculum CRUD (GET, PUT)
│   │   ├── tasks/         # Progress tracking (GET, POST)
│   │   ├── ai/generate/   # AI curriculum generation stub
│   │   └── reset/         # Progress reset endpoint
│   ├── dashboard/
│   │   ├── page.tsx       # Main curriculum tracker
│   │   ├── overview/      # Analytics dashboard
│   │   └── layout.tsx     # Protected layout with sidebar
│   ├── login/             # Login page
│   ├── register/          # Registration page
│   └── page.tsx           # Marketing landing page
├── components/
│   ├── StudyTracker.tsx    # Core tracker with full CRUD
│   ├── SectionCard.tsx     # Section renderer with subject/task management
│   ├── TaskList.tsx        # Checkbox-based task list
│   ├── Dashboard.tsx       # Progress bars overview
│   ├── Sidebar.tsx         # Navigation sidebar
│   └── ui/                # Reusable UI primitives
├── hooks/
│   └── useStudyData.ts    # TanStack Query hooks for data fetching
├── lib/
│   ├── mongodb.ts         # Connection pooling with race-condition protection
│   └── validations.ts     # Zod schemas with strict() enforcement
├── models/                # Mongoose schemas (User, StudyPlan, UserProgress)
├── middleware.ts           # Edge auth guard + security headers
└── utils/
    ├── tasks-data.ts      # Default curriculum seed data
    └── cn.ts              # Tailwind class merger utility
```

---

## 🔑 API Routes

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Register a new user with seeded curriculum |
| `GET` | `/api/plan` | Fetch the user's study plan |
| `PUT` | `/api/plan` | Update sections/subjects/tasks (Zod validated) |
| `GET` | `/api/tasks` | Fetch task completion progress |
| `POST` | `/api/tasks` | Save task completion states |
| `POST` | `/api/reset` | Reset all progress (keeps plan structure) |
| `POST` | `/api/ai/generate` | AI curriculum generation (stub) |

---

## 📜 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">
  Built with ❤️ by <a href="https://github.com/Aadiaditya9421">Aditya</a>
</p>
