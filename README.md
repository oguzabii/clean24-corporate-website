# Clean24 Corporate Experience

The corporate website for **Clean24** — a premium Swiss cleaning and facility brand.

> **Sauberkeit mit System.**

## About this project

This repository hosts the future Clean24 corporate website. This first phase
(**Issue #1 — Project Bootstrap**) establishes the technical foundation only:
a clean, Vercel-ready Next.js project. The full design, pages, and content will
be built in later phases.

## Tech stack

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS v4**
- **ESLint** (`eslint-config-next`)
- **Vercel-ready** project structure

## Getting started

Install dependencies and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the homepage placeholder.

## Available scripts

| Script          | Description                        |
| --------------- | --------------------------------- |
| `npm run dev`   | Start the local development server |
| `npm run build` | Create a production build          |
| `npm run start` | Run the production build locally   |
| `npm run lint`  | Run ESLint                         |

## Project structure

```
app/
  layout.tsx     Root layout, fonts, and metadata
  page.tsx       Homepage placeholder
  globals.css    Global styles and Tailwind import
public/          Static assets
```

## Roadmap

This is **Phase 1: Project Bootstrap**. Upcoming phases will introduce the brand
design system, the full page set, and production content. Heavy 3D dependencies
and the production domain are intentionally out of scope for this phase.
