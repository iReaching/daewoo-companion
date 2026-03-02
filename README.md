# Daewoo Air Fryer Oven Companion

A polished, private web app acting as a kitchen companion for my **Daewoo 16L Air Fryer Oven (DRAF01-16CRMSL)**. Built with Next.js 14, Tailwind CSS, and `lucide-react` for a minimal, warm aesthetic.

## Features
- **Recipe Book:** Browse and filter by mode, automatically loaded with reference values from the manual.
- **Favorites & Recent:** Save and revisit frequently used settings (uses `localStorage`).
- **Custom Recipes:** Add your own specific cooking notes and settings.
- **Troubleshooting & Manual:** Digital versions of the physical manual.
- **Cleaning & Safety:** Quick access to the oven's care limits.

## How to Run Locally

1. Clone or download this project.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the dev server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Editing Data
Because this app is static with no backend, all seed data lives directly in `src/data/`:
- **`src/data/recipes.ts`**: Edit initial recommended recipes here.
- **`src/data/troubleshooting.ts`**: Change/add troubleshooting.
- **`src/data/manual.ts`**: Update specs.
- **`src/data/safety.ts`**: Update safeguards.

## Vercel Deployment
This repository is pre-configured to build seamlessly on Vercel:
1. Push this code to a local/private GitHub repo.
2. Import the project into Vercel and leave the default settings (`Next.js` and `npm run build`).
3. Deploy!

*Note: Data persistence relies entirely on browser `localStorage`. Deploying essentially hosts the static dashboard.*
