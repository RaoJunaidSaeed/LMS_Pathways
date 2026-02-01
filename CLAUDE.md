# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
npm run dev       # Start Next.js dev server with hot reload
npm run build     # Production build
npm run start     # Start production server
npm run lint      # Run ESLint (flat config, Next.js core web vitals)
```

There is no test runner configured. Seed categories via `GET /api/seed`.

## Path Aliases

- `@/*` → `./src/*`
- `@public/*` → `./public/*`

Defined in `jsconfig.json` (this is a JavaScript project, not TypeScript).

## Architecture

### Tech Stack
- **Next.js 16** (App Router, Server Components, Server Actions)
- **React 19** with `'use client'` directives only where needed
- **MongoDB + Mongoose 9** for persistence
- **Clerk** for authentication and role-based access
- **Tailwind CSS 4** (PostCSS plugin, dark theme)
- **Cloudinary** for image uploads (`next-cloudinary`, upload preset: `lms_preset`)
- **react-player** for YouTube video embedding

### Dual-Role System
The app has two user roles: **student** and **teacher**. Role is selected at `/onboarding` after signup, stored in both Clerk user metadata (`sessionClaims.metadata.role`) and the MongoDB `User` model.

Middleware in `src/proxy.js` handles role-based routing:
- Users without a role are forced to `/onboarding`
- Users with a role are redirected to `/student` or `/teacher` dashboards
- Public routes: `/`, `/courses`, `/sign-in`, `/sign-up`

### Data Flow Pattern
All mutations use **Server Actions** (`'use server'`) in `src/lib/actions/`. The pattern is:
1. Authenticate with `auth()` from Clerk
2. Connect to DB via `connectDB()`
3. Perform Mongoose operation
4. Return `{ success, error, data }` object
5. Call `revalidatePath()` to refresh cached data

When returning Mongoose documents to client components, always serialize with `JSON.parse(JSON.stringify(doc))`.

### Database Connection
`src/lib/db.js` caches the MongoDB connection on `global.mongoose` to avoid reconnects during hot reload. Every server action and page data fetch must call `connectDB()` first.

### Mongoose Models (`src/models/`)
- **User** — `clerkId` (unique), `role` (student/teacher/admin)
- **Course** — owned by teacher (`userId` = Clerk ID), has `isPublished` workflow
- **Chapter** — belongs to Course, ordered by `position`, has `isFree` flag
- **Attachment** — file URLs attached to Course
- **Purchase** — unique compound index on `userId + courseId`
- **UserProgress** — unique compound index on `userId + chapterId`, tracks chapter completion
- **Category** — seeded via `/api/seed` endpoint

### Course Publishing Rules
A course requires all of: title, description, imageUrl, category, price, and at least one published chapter. Validated in the `publishCourse` server action.

### Component Organization
- `src/components/ui/` — shared UI (Navbar, Logo, SearchBar, etc.)
- `src/components/student/` — student-specific (sidebar, enrollment, progress, video player)
- `src/components/teacher/` — teacher-specific (sidebar)
- `src/components/courses/` — course editing forms (TitleForm, DescriptionForm, ImageForm, etc.)
- `src/components/chapters/` — chapter editing forms
- `src/components/search/` — search input and category filters
- `src/components/providers/` — React context providers (Toast)

### Layout Structure
Fixed navbar (80px height) + fixed sidebar (w-56) with `md:pl-56` offset on main content. Sidebar hidden on mobile, replaced by MobileMenu overlay.

### Environment Variables Required
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
CLERK_SECRET_KEY
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding
MONGODB_URI
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
```

## Loading Circle Edited

The global loading spinner (`src/app/loading.js`) was redesigned from the default plain-text "loading..." to a centered fullscreen overlay. It uses `fixed inset-0` positioning with flexbox centering, a CSS-only spinning circle in sky-blue (`border-sky-400 border-t-transparent animate-spin`), pulsing "Loading, please wait..." text, and a semi-transparent dark backdrop (`bg-[#141E30]/80`) matching the app's theme. No external dependencies — pure Tailwind utility classes.

## Incomplete Features

- `src/lib/actions/search.js` — skeleton, search not fully implemented
- `src/lib/actions/checkout.js` — minimal, payment integration not built
- `/teacher/analytics` — referenced in TeacherSidebar but page doesn't exist
