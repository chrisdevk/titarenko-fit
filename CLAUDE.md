# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Full-stack fitness coaching platform (titarenko.fit) built with **Next.js 15 App Router**, **Payload CMS 3**, and **Stripe** for e-commerce. Bilingual (English/Russian) with Cloudinary media storage and PostgreSQL database.

## Commands

```bash
npm run dev          # Start dev server with Turbopack
npm run build        # Production build
npm run start        # Start production server
npm run lint         # ESLint
npm run migrate:create  # Create Payload DB migration
npm run migrate      # Run Payload DB migrations
```

No test framework is configured.

## Architecture

### Routing & Route Groups

- **`app/(frontend)/[locale]/`** — Public-facing pages with dynamic locale segment (`en`, `ru`)
- **`app/(payload)/admin/`** — Payload CMS admin panel
- **`app/(payload)/api/`** — Payload REST API routes
- **`middleware.ts`** — Handles i18n routing and auth via `next-intl`

### Payload CMS Collections

Defined in `collections/`: Users, Products, Orders, Blogs, Categories, Media. Access control policies live in `access/`. Custom fields in `fields/`. Custom API endpoints in `endpoints/`. Config root: `payload.config.ts`. Generated types: `payload-types.ts`.

Collection hooks live in `collections/{Collection}/hooks/` and follow Payload's `beforeChange`/`afterChange` lifecycle. Key patterns:
- `Products/hooks/before-change.ts` — syncs Stripe product data into Payload before save
- `Orders/hooks/clear-user-cart.ts` — clears the buyer's cart after an order is created
- `Users/hooks/` — auto-login after signup, create Stripe customer on first save, populate `orderedBy` via field hook

Custom REST endpoints are defined per-collection in `collections/{Collection}/endpoints/` and registered in the collection config's `endpoints` array. Global custom endpoints (`/api/create-payment-intent`, `/api/stripe/products`) are registered directly in `payload.config.ts`.

### Key Integrations

- **Stripe**: Payment intents for checkout. Webhook handlers in `stripe/webhooks/`. The `payment-succeeded` webhook creates Orders in Payload using cart metadata embedded in the payment intent and looks up the user via Stripe customer ID. Plugin auto-syncs products. User signup creates Stripe customer via hooks.
- **Cloudinary**: Custom storage adapter in `cloudinary-adapter/`. Used by Media collection.
- **i18n (next-intl)**: Default locale is `ru`. Translation files in `messages/en.json` and `messages/ru.json`. Routing config in `i18n/`.

### State Management

- **React Context** (`context/`): AuthProvider, CartProvider, ProgressProvider
- **TanStack React Query**: Server state caching, configured in `app/providers.tsx`
- **Cart**: Persists to localStorage for guests. On login, `MERGE_CART` action syncs local cart → user's Payload cart via `PATCH /api/users/{id}`. A `flattenCart` utility normalizes the structure before merging. Cart is cleared server-side by an `afterChange` hook on Orders.

### UI Layer

- **shadcn/ui** components in `components/ui/` (configured via `components.json`)
- **React Hook Form + Zod** for form validation
- **Motion** for animations, **Sonner** for toast notifications
- **Tailwind CSS** with custom color tokens (indigo-custom, turquoise-dark/light, purple-custom, off-white, off-black) defined as CSS variables

### Data Flow

- Client mutations use server actions in `utils/actions/` (`"use server"` directive). These are thin wrappers that call Payload's REST API (e.g., `POST /api/users/login`) rather than direct DB mutations.
- Data fetching utilities in `utils/data/`
- Cache invalidation via `revalidateTag()`

### Auth

- Payload native auth with JWT in `payload-token` cookie
- Roles: `admin`, `customer`. First user to register is auto-promoted to admin via an `ensureFirstUserIsAdmin` field hook.
- Access control functions in `access/` (e.g., `admins.ts`, `admins-or-loggedin.ts`)
- Middleware guards `/dashboard` and `/club/month` routes — redirects to auth if `payload-token` cookie is absent

## Conventions

- ES modules (`"type": "module"` in package.json)
- TypeScript strict mode; path aliases `@/*` → root, `@payload-config` → `payload.config.ts`
- Collections are PascalCase files; context files use `-context.tsx` suffix
- Prettier with `prettier-plugin-tailwindcss` for class sorting
- `"use client"` / `"use server"` directives used deliberately at file boundaries

## Environment

Requires `.env` with: `DATABASE_URI` (PostgreSQL), `PAYLOAD_SECRET`, `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, Cloudinary credentials, SMTP config for email.

## Task Management

- Write plan to tasks/todo.md with checkable items
- Check in before starting implementation
- Mark items complete as you go
- Update tasks/lessons.md after any correction
