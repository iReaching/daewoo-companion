# Daewoo Air Fryer Oven Companion

## SIDE NOTE
This is a private project, not for public use. I'm using it to keep track of my favorite recipes and settings for my Daewoo 16L Air Fryer Oven (DRAF01-16CRMSL). I'm not sharing it because I don't want to deal with the hassle of maintaining a public repository. If you want to use it, you can clone it and run it locally. This project is not affiliated with Daewoo or any other company. It is merely a personal project. Made using Antigravity Gemini 3.1 Pro (High), with some manual editing.

## Project Structure
- **`src/data/`**: Contains all static data, including recipes, troubleshooting, manual, and safety information.
- **`src/components/`**: Reusable UI components for the app.
- **`src/hooks/`**: Custom hooks for managing state and side effects.
- **`src/app/`**: Next.js app directory with pages and layouts.
- **`public/`**: Static assets like images and icons.

## Tech Stack
- **Next.js 14**: A React framework for server-rendered React applications.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **lucide-react**: A collection of free and open-source icons for React.

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
