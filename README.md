# 🥙 TheMealDB Recipe Discovery 🍽️

**Author:** Zac White

## Overview

A recipe discovery single page application built with React and TypeScript. Users can browse recipes by category, search by name, view detailed recipe information, and manage a personal favorites list that persists across sessions. Built using TheMealDB free public API.

## Features

- [ ] Browse all recipe categories on the home page
- [ ] Dynamic category page showing all recipes in a category
- [ ] Dynamic recipe detail page with full ingredients and instructions
- [ ] Add and remove recipes from a personal favorites list
- [ ] Favorites persist via localStorage across browser sessions
- [ ] Search recipes by name from a shared Navbar search bar
- [ ] Search results page displaying matched recipes
- [ ] Loading and error states on all data-fetching pages
- [ ] Responsive, styled UI with reusable components

## Tech Stack

- [React 19](https://react.dev/) — UI library
- [TypeScript](https://www.typescriptlang.org/) — Type safety
- [Vite](https://vitejs.dev/) — Build tool and dev server
- [React Router DOM](https://reactrouter.com/) — Client-side routing
- [TheMealDB API](https://www.themealdb.com/api.php) — Recipe data source

## Project Structure

```
src/
├── components/
│   ├── Navbar/           ← search bar and navigation links
│   ├── RecipeCard/       ← reusable recipe preview card
│   ├── Spinner/          ← loading state indicator
│   └── ErrorMessage/     ← error state display
├── context/
│   └── FavoritesContext.tsx  ← global favorites state
├── hooks/
│   ├── useFetch.ts       ← generic data fetching hook
│   └── useLocalStorage.ts ← localStorage sync hook
├── pages/
│   ├── HomePage.tsx      ← category grid
│   ├── CategoryPage.tsx  ← recipes by category
│   ├── RecipeDetailPage.tsx ← full recipe view
│   ├── FavoritesPage.tsx ← saved favorites list
│   ├── SearchPage.tsx    ← search results
│   └── NotFoundPage.tsx  ← 404 catch-all
├── types/
│   └── index.ts          ← all TypeScript interfaces
├── App.css               ← global application styles
├── App.tsx               ← root component with routing
├── index.css             ← base reset and font styles
└── main.tsx              ← React entry point
```

## Getting Started

Clone the repository and install dependencies:

```bash
git clone https://github.com/zstem001hz-droid/themealdb-recipe-discovery.git
cd themealdb-recipe-discovery
npm install
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## API Reference

This project uses [TheMealDB API](https://www.themealdb.com/api.php) — a free
public recipe database. No API key setup is required for development.

**Base URL:** `https://www.themealdb.com/api/json/v1/1/`

| Endpoint                  | Description               |
| ------------------------- | ------------------------- |
| `categories.php`          | All recipe categories     |
| `filter.php?c={category}` | Recipes by category       |
| `lookup.php?i={id}`       | Full recipe details by ID |
| `search.php?s={query}`    | Search recipes by name    |

## Components

### Navbar

Site-wide navigation with search bar. Search input navigates to the search results page on submission.

### RecipeCard

### Spinner

### ErrorMessage

## Custom Hooks

### useFetch

### useLocalStorage

## References

### React

### React Router

- [React Router Documentation](https://reactrouter.com/)
- [BrowserRouter — React Router](https://reactrouter.com/en/main/router-components/browser-router)
- [Routes and Route — React Router](https://reactrouter.com/en/main/components/routes)

### TypeScript

### JavaScript

### Git

- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)

### Tools

- [Vite Documentation](https://vitejs.dev/guide/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [TheMealDB API Documentation](https://www.themealdb.com/api.php)

## Known Issues & Future Improvements

_To be documented as development progresses._

## Reflections
