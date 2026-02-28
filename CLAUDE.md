# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A Single Slide — a minimal, distraction-free full-screen text editor for displaying text on a single slide. Built with Vue 3 (Composition API), Vite, and TailwindCSS. PWA-enabled. Live at https://a-single-slide.io/

## Commands

- `npm run dev` — Start dev server (port 5173)
- `npm run build` — Production build
- `npm test` — Run tests (Jest)
- `npm run test:watch` — Run tests in watch mode
- `npx jest tests/components/Editor.spec.js` — Run a single test file

## Architecture

**App.vue** is the root component. It handles URL-based color customization (`?bg=`, `?color=`) and renders the Editor.

**Editor.vue** is the core component — a contenteditable div that persists to localStorage as JSON. Features auto-hiding caret (5s timeout) and loads saved content on click.

**FontSelector.vue** provides a toggle dropdown (top-right "Aa" button) for selecting from 20 Google Web Fonts and font weights. Generates shareable URLs with font parameters.

**useGoogleFonts.js** composable manages dynamic Google Font loading via `<link>` tags, reads/writes URL params (`?font=`, `?weight=`), and updates browser history.

## URL Parameters

All customization is URL-driven: `?font=Inter&weight=700&bg=1a1a2e&color=e0e0e0`. Colors accept hex values with or without `#`.

## Testing

Tests live in `tests/components/` using Jest + Vue Test Utils. Config in `jest.config.cjs` with jsdom environment. Path alias `@/` maps to `src/`.
