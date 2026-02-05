# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint (eslint v9, eslint-config-next)
```

**Database seeding:** Hit `GET /api/seed` to populate the Category collection with default categories (Computer Science, Music, Fitness, Photography, Accounting, Engineering, Filming).

There are no test scripts configured in this project.

## Tech Stack

- **Next.js 16.1** (App Router) with **React 19** — JavaScript/JSX only, no TypeScript
- **MongoDB** via **Mongoose 9** — connection cached on `global.mongoose` in `src/lib/db.js`
- **Clerk 6** for auth — middleware in `src/proxy.js`, roles stored in `publicMetadata.role`
- **Tailwind CSS 4** via `@tailwindcss/postcss` — custom dark theme in `src/app/_styles/globals.css`
- **Cloudinary** for image/video upload — utility in `src/lib/cloudinary-upload.js`, upload preset `lms_preset`

## Path Aliases

- `@/*` → `./src/*`
- `@public/*` → `./public/*`

## Architecture

### Authentication & Routing Flow

Clerk middleware (`src/proxy.js`) enforces this flow:
1. Unauthenticated users on private routes → redirect to `/sign-in`
2. Authenticated users without a role → forced to `/onboarding` (role selection: student or teacher)
3. Authenticated users with a role → redirected to `/student` or `/teacher` based on `sessionClaims.metadata.role`

Public routes: `/`, `/courses`, `/sign-in`, `/sign-up`.

### Route Groups

- **`/student/*`** — Student dashboard, course search, enrolled courses, chapter video player. Layout includes `StudentSidebar` (enrolled courses + progress).
- **`/teacher/*`** — Teacher dashboard, course creation/editing, chapter editing. Layout includes `TeacherSidebar` (created courses + actions).
- **`/onboarding`** — One-time role selection page.

### Server Actions (`src/lib/actions/`)

All data mutations use Next.js Server Actions (not API routes). Each action calls `connectDB()`, authenticates via `auth()`, and returns `{ success, ... }` or `{ error }`.

Key actions: `user.js` (onboarding), `course.js` (CRUD + publish/unpublish), `chapter.js` (CRUD + publish/unpublish + position ordering), `progress.js` (completion tracking + percentage calc), `checkout.js` (purchase creation), `attachment.js` (course resources), `search.js` (course discovery).

**Publish validation:**
- Courses require: title, description, imageUrl, category, price, and at least 1 published chapter
- Chapters require: title and videoUrl

### Mongoose Models (`src/models/`)

- **User**: clerkId (unique), email, role (student/teacher/admin)
- **Course**: userId (teacher), title, description, price, imageUrl, isPublished, category; refs to chapters[] and attachments[]
- **Chapter**: title, videoUrl, position (for ordering), isPublished, isFree, courseId
- **Purchase**: userId + courseId (unique compound index — prevents double purchase)
- **UserProgress**: userId + chapterId (unique compound), isCompleted
- **Attachment**: name, url, courseId
- **Category**: name (unique)

Models use the `mongoose.models.X || mongoose.model('X', schema)` pattern for hot-reload safety.

### Video System

Three video input methods in the chapter editor (`src/components/chapters/ChapterVideoForm.jsx`):
1. **YouTube URL** — stored as videoUrl, rendered as `<iframe>`
2. **Webcam/Screen recording** — MediaRecorder API (`src/components/chapters/VideoRecorder.jsx`), uploaded to Cloudinary
3. **File upload** — direct Cloudinary upload with progress tracking via XHR

Playback: YouTube URLs detected via regex → iframe; all other URLs → native `<video>` tag.

### State & Data Patterns

- **UserRoleContext** (`src/utils/context/UserRoleContext.js`): provides `{ role, dashboardUrl }` from Clerk session
- **useDebounce hook** (`src/hooks/use-debounce.js`): 500ms debounce for search input
- **Toast notifications**: `react-hot-toast` via `ToastProvider` at root layout
- **Revalidation**: Server actions call `revalidatePath()` after mutations
- **Mongoose serialization**: `JSON.parse(JSON.stringify(doc))` when returning objects to client components

## Environment Variables

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY   # Clerk publishable key
CLERK_SECRET_KEY                    # Clerk secret key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding
MONGODB_URI                         # MongoDB connection string
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME   # Cloudinary cloud name
```

## Styling Conventions

Dark theme with custom CSS variables (`--color-midnight-*`, `--color-sky-*`) defined in `globals.css`. Body uses `bg-slate-950 text-slate-200`. Cards use `GlassCard` component (semi-transparent with backdrop blur). Tailwind classes applied directly — no CSS modules or styled-components.
