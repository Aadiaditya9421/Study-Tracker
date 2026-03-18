# TrackerPro: Global Study & Curriculum Tracker 🚀

TrackerPro is a robust, global-scale B2C SaaS application designed to help students, professionals, and lifelong learners structure their curriculums, organize subjects dynamically, and forecast their goals with powerful, real-time analytics.

Built to enterprise standards by **Aritra AI**, it features a stunning SEO-optimized marketing landing page, secure authentication, dynamic data visualization, and seamless light/dark mode transitions.

## ✨ Key Features

- **Marketing Landing Page:** High-converting, SEO-optimized public face with pulsing framer-motion micro-animations.
- **Advanced Interactive Dashboard:** A dedicated `/dashboard` workspace with persistent collapsible sidebar navigation.
- **Dynamic Curriculum Builder:** Add, modify, and delete Custom Sections, Subjects, and Tasks on the fly. No more hardcoded data!
- **Data Visualization & Analytics:** Features dynamic Recharts (Donut Charts) that automatically calculate your progress velocity and distribution.
- **Secure Authentication:** Built-in credentials authentication flow powered by NextAuth.js and securely hashed with bcrypt.
- **Enterprise-Grade Validation:** Complete Zod schema validation on backend routes to ensure robust data integrity into MongoDB.
- **Fluid Theming:** Full support for System/Light/Dark mode via `next-themes` and Tailwind CSS.

## 🛠 Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (v4) + Framer Motion
- **Database:** MongoDB Atlas & Mongoose
- **Authentication:** NextAuth.js (Auth.js)
- **Validation:** Zod
- **Data Visualization:** Recharts
- **Icons:** Lucide-React

## 🚀 Getting Started

### Prerequisites

You need [Node.js](https://nodejs.org/) installed on your machine.
A MongoDB cluster string (MongoDB Atlas is recommended).

### Environment Variables

Create a `.env.local` file in the root directory and add the following:

```env
# Your MongoDB Connection String
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/study-tracker?appName=AADI

# NextAuth Secret (Generate a strong ranodm string, e.g. using `openssl rand -base64 32`)
NEXTAUTH_SECRET=your_super_secret_string_here
```

### Installation

1. Clone the repository and navigate into the project directory:
```bash
git clone <your-repo-url>
cd study-tracker
```

2. Install the dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 💡 Usage Guide

1. **Sign Up:** Create a new account. Your profile will automatically be seeded with the default 40-Day Course & 45-Day Placement curriculum.
2. **Dashboard:** Once logged in, you will be redirected to the interactive tracker. Navigate between "My Curriculum" to check off tasks, and "Overview" to view your analytics.
3. **Customize:** Hover over any Section or Subject header to reveal inline actions (`Add Subject`, `Add Task`, or `Remove`).
4. **Theme:** Use the sun/moon toggle at the bottom of the sidebar to switch themes.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details. Built for global scale.
