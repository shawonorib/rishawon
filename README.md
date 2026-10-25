# Rakibul Islam Shawon — Data Analyst Portfolio

A responsive, single-page portfolio showcasing illustrative data-analysis projects, skills, and contact information. The portfolio is a public static site: visitors see the same content, and no sign-in is required.

![Abstract mint wireframe landscape used in the portfolio hero](./src/assets/Preview.png)

> **Sample content:** The projects, metrics, résumé/profile text, and biography in this repository are illustrative portfolio content. They should not be read as verified work history, client results, or credentials.

## Features

- Responsive page with Home, Projects, About, Skills, Data Lab, and Contact sections
- Scroll-aware navigation and smooth section scrolling
- Light and dark themes
- Project cards with category filters, charts, and case-study dialogs
- Animated technology strip and interactive chart and card effects
- Downloadable résumé PDF at `src/assets/Rakibul-Islam-Shawon-Profile.pdf`
- Contact form that downloads an inquiry draft locally; it does not send or store messages
- Reduced-motion support for visitors who request less animation

## Tech stack

- React 18 and TypeScript
- Vite
- Tailwind CSS and shadcn/ui components built on Radix UI
- Recharts for portfolio visualizations
- React Router and `next-themes`

## Requirements

- Node.js (use a current LTS release)
- npm

## Getting started

Install the dependencies from the npm lockfile:

```sh
npm ci
```

Start the local development server:

```sh
npm run dev
```

Vite serves the app at [http://localhost:8080](http://localhost:8080), as configured in `vite.config.ts`.

## Available scripts

| Command              | Description                          |
| -------------------- | ------------------------------------ |
| `npm run dev`        | Start the Vite development server    |
| `npm run build`      | Create a production build in `dist/` |
| `npm run build:dev`  | Build using Vite's development mode  |
| `npm run preview`    | Preview the production build locally |
| `npm run lint`       | Run ESLint across the project        |
| `npm test`           | Run the Vitest test suite once       |
| `npm run test:watch` | Run Vitest in watch mode             |

Before deploying, run:

```sh
npm run lint
npm test
npm run build
```

Deploy the contents of `dist/` to a static hosting provider. Since the app uses browser-based routing, configure the host to serve `index.html` for application routes that do not match a static file.

## Project layout

```text
src/
  assets/       Images and résumé PDF
  components/   Portfolio and reusable UI components
  lib/          Local portfolio project content and utilities
  pages/        Landing page and not-found page
  App.tsx       Theme provider and application routes
  index.css     Global and portfolio styles
public/         Static files served as-is
```

The illustrative project content is maintained locally in `src/lib/portfolio.ts`. Update it there when changing project titles, descriptions, tools, or chart data. Keep sample projects clearly labeled unless replacing them with verified information.

## Content and configuration

The portfolio can be viewed and built without visitor accounts or an authentication flow. Avoid committing private credentials. If local environment variables are needed for separate development integrations, keep them in an untracked `.env.local` file and document only their names—not their values.
