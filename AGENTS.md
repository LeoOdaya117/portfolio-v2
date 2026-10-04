<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Portfolio v2 — Agent Guide

This is the shared project guide for AI coding agents. `AGENTS.md` is the source of truth for project instructions. `CLAUDE.md` imports this file with `@AGENTS.md`; keep that link in place so Claude Code and Codex receive the same guidance.

## Project at a glance

- Personal portfolio built with the Next.js App Router, React, and strict TypeScript.
- Next.js is pinned at 16.3.8; React's package range starts at 19.2.8, and `package-lock.json` records the resolved dependency set. Treat the lockfile, installed dependencies, and local Next.js documentation as authoritative.
- Application code lives in `src/`; the current site is a single page assembled from layout and home-section components.
- Tailwind CSS v4 is installed and imported. Existing styles also include component selectors in `src/app/globals.css`; follow the component-scoped styling rules below for new and substantially changed UI.
- There is no database, API layer, or authentication system. Do not assume one exists.

## Start here

1. Read this file and check the current working tree before making changes. Preserve existing user edits; do not reset, overwrite, or revert unrelated work.
2. Read the relevant component, data, type, style, and route files before changing them. Follow existing patterns unless the task calls for a deliberate change.
3. For any Next.js-specific code or behavior, read the relevant guide under `node_modules/next/dist/docs/` first. Start with the App Router guides and API reference; do not rely on remembered APIs or examples for another Next.js version.
4. Make the smallest coherent change that fulfills the request. Avoid unrelated refactors or architecture; add dependencies only when they are needed, including the minimal test tooling required for behavior coverage.
5. Summarize the files changed and checks performed. Never claim a check passed if it was not run.

## Repository map

```text
src/
  app/                 App Router routes, root layout, metadata, global CSS
  components/
    home/              Components belonging to the home page
    layout/            Site-wide header and footer
  data/                Static, typed content consumed by components
  types/               Shared TypeScript data and component-domain types
public/                Static assets addressed by URL from the site root
```

- `src/app/page.tsx` composes the home page. Put route entry points and route-level files in `src/app/` using the installed App Router conventions.
- `src/app/layout.tsx` owns the root document, metadata, and global stylesheet import.
- `src/components/home/` holds page-section UI; `src/components/layout/` holds shared site chrome. Put future components in the closest existing domain rather than growing a route file into a monolith.
- `src/data/` holds static page copy and structured content; matching contracts live in `src/types/`. Keep content out of presentation markup when it is naturally data-driven.
- The `@/*` TypeScript alias points to `src/*`. Prefer it for imports across `src/`; use relative imports for nearby files when they read more clearly.
- Keep project configuration (`package.json`, `tsconfig.json`, Next.js/PostCSS/ESLint config) at the repository root, and keep browser-served assets in root `public/`.

## Architecture and implementation conventions

### Next.js and React

- Use the App Router in `src/app/`; do not introduce a second router or a competing route structure.
- Components are Server Components by default. Add `'use client'` only at the smallest boundary that needs browser state, effects, event handlers, or browser-only APIs. Keep static content and server-only work outside the client bundle.
- Before using or changing a Next.js API, route convention, image behavior, metadata API, caching behavior, or navigation behavior, read its guide for the installed version under `node_modules/next/dist/docs/`. Follow current guidance and deprecation notices.
- Use `next/link` for navigation between application routes. Plain anchors are appropriate for same-page fragments (`#section`) and external destinations.
- Use `next/image` for content images. Supply meaningful `alt` text (or `alt=""` for decorative images), and provide `sizes` for responsive `fill` images. Public files are referenced from `/`, for example `/images/hero-workspace-mockup.png`.
- Keep metadata in the route or layout metadata export, following the installed version's docs.

### TypeScript and data

- Keep TypeScript strict. Avoid `any`, unsafe casts, and duplicated type definitions; model data with explicit types or inference.
- Follow the existing data pattern: export a named data constant from `src/data/`, import its type from `src/types/`, and use `satisfies` to check the object without widening useful literal types.
- Use discriminated unions or literal unions for finite options such as icon names and variants. Map those values to explicit components or styles; do not build imports from untrusted or arbitrary strings.
- Keep reusable contracts in `src/types/`. Keep component-only types close to the component unless they are shared.
- Use descriptive names: PascalCase for React component files/functions, camelCase for values and functions, and the existing kebab-case CSS class convention.

### Styling and responsive UI

- Prefer Tailwind CSS v4 utilities for most component styling. Keep utility classes readable and use responsive, state, and accessibility variants where they fit.
- Use a co-located CSS Module for complex or component-specific styling that is clearer in CSS, such as detailed animations, pseudo-elements, complex selectors, or substantial responsive rules. Name it after the component (for example, `Hero.tsx` with `Hero.module.css`) and import it only in that component.
- Do not add component-specific selectors to `src/app/globals.css`. Keep that file for the Tailwind import, global reset/base styles, fonts, design tokens/theme variables, document defaults, and styles that truly apply site-wide. Reuse global custom properties from Tailwind classes and CSS Modules.
- A component may combine Tailwind utilities for common layout with a CSS Module for specialized styles when that keeps the implementation clear. Avoid duplicating the same declarations in both.
- Keep responsive rules beside the styles they adapt: Tailwind variants in the component and media queries in the component's CSS Module. Support narrow and wide screens, and avoid fixed widths that cause overflow.
- Preserve visible keyboard focus, readable contrast, semantic HTML, heading order, and reduced-motion preferences when adding interactive or animated UI.
- Avoid inline styles for static presentation. Use them only when a value must be computed dynamically and a class or CSS custom property is not a better fit.

### Content and accessibility

- Preserve the portfolio owner's factual content, voice, and asset paths. Do not invent credentials, projects, testimonials, or contact details.
- Use landmarks, headings, lists, and links according to their meaning. Give navigation landmarks accessible labels when a page has more than one navigation region.
- Mark decorative icons as hidden from assistive technology; provide accessible text for icon-only controls. Ensure interactive controls are keyboard operable and have visible focus states.
- Keep image alternative text useful and concise. Do not repeat adjacent text in an image's `alt` description.

## Commands

Use the package scripts defined in `package.json`:

```bash
npm ci          # install the locked dependency set
npm run dev     # start the local development server
npm run lint    # run ESLint
npm test        # run the Vitest test suite
npm run build   # create a production build
npm run start   # serve a previously built app
```

## Testing

- Tests use Vitest with jsdom and React Testing Library. Configuration is in `vitest.config.mts`, tests live in `tests/`, and `npm test` runs the suite. `npm run lint` and `npm run build` are checks, not substitutes for automated tests.
- Add or update automated tests for every new feature and every change to application behavior. For bug fixes, add a regression test that would have caught the bug when practical.
- Derive cases from the acceptance criteria. Cover the main success path and relevant edge or error states; include keyboard and accessibility behavior when the feature has user interaction.
- Use the smallest useful test level: Vitest for isolated logic and component behavior, and browser end-to-end tests for critical flows that need a real browser. Avoid redundant tests that only repeat the same assertion at multiple levels.
- For component tests, prefer React Testing Library queries by role and accessible name, and assert user-visible behavior instead of implementation details. Keep tests focused and deterministic.
- If a feature needs a test capability this setup does not provide, first read the installed Next.js testing guides under `node_modules/next/dist/docs/01-app/02-guides/testing/`, then add only the compatible tooling and configuration needed for that coverage.
- Documentation-only changes and changes that do not affect behavior generally do not need new tests. State the reason when a behavior change cannot be tested.
- Run `npm test` and the relevant lint/build checks for behavior changes, and report exactly what ran and its result.

## Boundaries

- Do not commit, push, publish, deploy, or send project contents to external services unless the user explicitly asks.
- Avoid production dependencies and unrelated configuration. Add the smallest necessary test dependencies and configuration when they are needed to meet the testing guidance above.
- Never put secrets in client components, static content, or files under `public/`. Keep environment-specific values out of source control.
- Do not edit the managed block above. Next.js maintains it and may recreate it during development.
