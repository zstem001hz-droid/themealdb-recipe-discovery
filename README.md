# 🥙 TheMealDB Recipe Discovery 🍽️

**Author:** Zac White

## Overview

A recipe discovery single page application built with React and TypeScript. Users can browse recipes by category, search by name, view detailed recipe information, and manage a personal favorites list that persists across sessions. Built using TheMealDB free public API.

## Features

- 📕 Browse all recipe categories on the home page
- 📖 Dynamic category page showing all recipes in a category
- [ ] Dynamic recipe detail page with full ingredients and instructions
- [ ] Add and remove recipes from a personal favorites list
- [ ] Favorites persist via localStorage across browser sessions
- [ ] Search recipes by name from a shared Navbar search bar
- [ ] Search results page displaying matched recipes
- [ ] Loading and error states on all data-fetching pages
- 🍽️ Responsive, styled UI with reusable components

## Tech Stack

- [React 19](https://react.dev/) — UI library
- [TypeScript](https://www.typescriptlang.org/) — Type safety
- [Vite](https://vitejs.dev/) — Build tool and dev server
- [React Router DOM](https://reactrouter.com/) — Client-side routing
- [TheMealDB API](https://www.themealdb.com/api.php) — Recipe data source
- [Postman](https://www.postman.com/) — API endpoint testing

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
Site-wide navigation with search bar and active route highlighting. Search input navigates to `/search?query=...` on submission. Uses NavLink for automatic active state styling.

### RecipeCard

### Spinner
CSS-animated loading indicator displayed during all API fetch operations. Rendered by page components while useFetch loading state is true.

### ErrorMessage
Displays a styled error message when API requests fail. Receives the error string from useFetch and renders it with a warning indicator in a visually distinct container.

## Custom Hooks

### useFetch
Generic data fetching hook managing data, loading, and error states. Accepts a URL string and returns `{ data, loading, error }`. Uses AbortController cleanup to prevent race conditions on rapid URL changes or component unmounts.

### useLocalStorage
Synchronizes React state with localStorage using a useState-compatible API. Accepts a key and initial value, returns `[value, setValue]`. Handles JSON serialization, parsing errors, and storage failures gracefully.

## Development Notes

### CSS Animation — Spinner
The loading spinner uses a pure CSS `@keyframes` animation rather than an external library. The spinning effect is achieved by coloring only the `border-top` of a circular div and rotating it continuously. See `.spinner` and `@keyframes spin` in `App.css`.

```css
.spinner {
  border: 5px solid #f3f3f3;
  border-top: 5px solid #c0392b;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
```

### Postman Testing
API endpoints were tested manually in Postman before integration. See the API Reference section for all endpoints used in this project.

### API Testing
All TheMealDB endpoints were verified manually in Postman before React integration. A dedicated collection was created in the `PerScholas — Advanced React` Postman workspace to keep API testing isolated from other projects.

Endpoints tested:
- `categories.php` — returns 14 category objects
- `filter.php?c={category}` — returns meals array for a given category
- `lookup.php?i={id}` — returns full meal details object
- `search.php?s={query}` — returns meals array matching search term

## References

### React
- [useEffect — React Docs](https://react.dev/reference/react/useEffect)
- [useState — React Docs](https://react.dev/reference/react/useState)
- [Building Your Own Hooks — React Docs](https://react.dev/learn/reusing-logic-with-custom-hooks)
- [createContext — React Docs](https://react.dev/reference/react/createContext)
- [useContext — React Docs](https://react.dev/reference/react/useContext)
- [useCallback — React Docs](https://react.dev/reference/react/useCallback)

### React Router
- [React Router Documentation](https://reactrouter.com/)
- [BrowserRouter — React Router](https://reactrouter.com/en/main/router-components/browser-router)
- [Routes and Route — React Router](https://reactrouter.com/en/main/components/routes)
- [NavLink — React Router](https://reactrouter.com/en/main/components/nav-link)
- [useNavigate — React Router](https://reactrouter.com/en/main/hooks/use-navigate)
- [useSearchParams — React Router](https://reactrouter.com/en/main/hooks/use-search-params)
- [useParams — React Router](https://reactrouter.com/en/main/hooks/use-react-router)

### TypeScript
- [TypeScript Generics — TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/2/generics.html)
- [TypeScript Interfaces — TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/2/objects.html)

### JavaScript
- [Fetch API — MDN](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [AbortController — MDN](https://developer.mozilla.org/en-US/docs/Web/API/AbortController)
- [localStorage — MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- [JSON.parse — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse)
- [JSON.stringify — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)
- [Array.prototype.filter — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
- [Array.prototype.some — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some)
- [Array.prototype.map — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
- [Optional chaining (?.) — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining)

### CSS
- [CSS Flexbox — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout)
- [CSS transition — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/transition)
- [CSS animation — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/animation)
- [@keyframes — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/@keyframes)
- [CSS animation — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/animation)
- [@keyframes — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/@keyframes)
- [CSS Grid — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout)
- [CSS Custom Properties — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)

### Git
- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)

### Tools
- [Vite Documentation](https://vitejs.dev/guide/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [TheMealDB API Documentation](https://www.themealdb.com/api.php)
- [Postman](https://www.postman.com/)
- [Postman Learning Center](https://learning.postman.com/docs/getting-started/overview/)

## Known Issues & Future Improvements

_To be documented as development progresses._

## Reflections
