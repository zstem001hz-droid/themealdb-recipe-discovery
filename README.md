# 🥙 TheMealDB Recipe Discovery 🍽️

![React](https://img.shields.io/badge/React-19.x-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![Vite](https://img.shields.io/badge/Vite-6.x-purple)
![React Router](https://img.shields.io/badge/React_Router-7.x-red)
![TheMealDB](https://img.shields.io/badge/API-TheMealDB-orange)

**Author:** Zac White

## Overview

A recipe discovery single page application built with React and TypeScript. Users can browse recipes by category, search by name, view detailed recipe information, and manage a personal favorites list that persists across sessions. Built using TheMealDB free public API.

## Features

- 📕 Browse all recipe categories on the home page
- 📖 Dynamic category page showing all recipes in a category
- 🍲 Dynamic recipe detail page with full ingredients and instructions
- 🩶 Add and remove recipes from a personal favorites list
- ❤️ Favorites persist via localStorage across browser sessions
- 🥩 Search recipes by name from a shared Navbar search bar
- 🍜 Search results page displaying matched recipes
- ⏳ Loading and error states on all data-fetching pages
- 🍽️ Responsive, styled UI with reusable components

## Tech Stack

- [React 19](https://react.dev/) — UI library
- [TypeScript](https://www.typescriptlang.org/) — Type safety
- [Vite](https://vitejs.dev/) — Build tool and dev server
- [React Router DOM](https://reactrouter.com/) — Client-side routing
- [TheMealDB API](https://www.themealdb.com/api.php) — Recipe data source
- [Postman](https://www.postman.com/) — API endpoint testing

## Application Flow

1. User lands on HomePage — all recipe categories fetched from TheMealDB API via `useFetch`
2. User selects a category — CategoryPage fetches all recipes in that category
3. User selects a recipe — RecipeDetailPage fetches full ingredients and instructions
4. User adds recipe to favorites — `FavoritesContext` updates global state
5. Favorites persisted to localStorage via `useLocalStorage` — survives browser refresh
6. User searches by name — SearchPage fetches and displays matched recipes
7. Loading and error states handled globally via `Spinner` and `ErrorMessage` components

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

This project uses [TheMealDB API](https://www.themealdb.com/api.php) — a free public recipe database. No API key setup is required for development.

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

**Example:**

```
<Navbar />
```

### RecipeCard
Reusable recipe preview card with favorite toggle button. Used on CategoryPage, FavoritesPage, and SearchPage. Links to the recipe detail page. The favorite button uses e.preventDefault() to stop Link navigation when toggling favorites.

**Example:**

```
<RecipeCard
  idMeal="52772"
  strMeal="Apple Frangipan Tart"
  strMealThumb="https://www.themealdb.com/images/media/meals/wxywrq1468235067.jpg"
/>
```

### Spinner
CSS-animated loading indicator displayed during all API fetch operations. Rendered by page components while useFetch loading state is true.

**Example:**

```
if (loading) return <Spinner />
```

### ErrorMessage
Displays a styled error message when API requests fail. Receives the error string from useFetch and renders it with a warning indicator in a visually distinct container.

**Example:**

```
if (error) return <ErrorMessage message={error} />
```

## Custom Hooks

### useFetch
Generic data fetching hook managing data, loading, and error states. Accepts a URL string and returns `{ data, loading, error }`. Uses AbortController cleanup to prevent race conditions on rapid URL changes or component unmounts.

**Example:**
```
const { data, loading, error } = useFetch<CategoriesResponse>(
  'https://www.themealdb.com/api/json/v1/1/categories.php'
)
```

### useLocalStorage
Synchronizes React state with localStorage using a useState-compatible API. Accepts a key and initial value, returns `[value, setValue]`. Handles JSON serialization, parsing errors, and storage failures gracefully.

**Example:**

```
const [favorites, setFavorites] = useLocalStorage<FavoriteRecipe[]>('favorites', [])
```

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

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

### API Testing
All TheMealDB endpoints were verified manually in Postman before React integration. A dedicated collection was created in an `Academic Sandbox` Postman workspace to keep API testing isolated from other personal projects.

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
- [useParams — React Router](https://reactrouter.com/en/main/hooks/use-params)

### TypeScript
- [TypeScript Generics — TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/2/generics.html)
- [TypeScript Interfaces — TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/2/objects.html)
- [Index Signatures — TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/2/objects.html#index-signatures)

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
- [Array.from — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from)
- [String.prototype.trim — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trim)

### CSS
- [CSS Flexbox — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout)
- [CSS transition — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/transition)
- [CSS animation — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/animation)
- [@keyframes — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/@keyframes)
- [CSS Grid — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout)
- [CSS Custom Properties — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [CSS Media Queries — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries)
- [CSS Box Shadow — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow)

### Tools & APIs
- [Vite Documentation](https://vitejs.dev/guide/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [TheMealDB API Documentation](https://www.themealdb.com/api.php)
- [Postman](https://www.postman.com/)
- [Postman Learning Center](https://learning.postman.com/docs/getting-started/overview/)

### Git
- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)

## Known Issues & Future Improvements

- **Recipe detail flash:** A brief "Recipe not found" message appears during initial load in development due to React StrictMode double-rendering. This does not occur in production builds.
- **Ingredient cap:** Ingredient list is capped at 15 items — TheMealDB supports up to 20 per recipe. A future improvement would extend this to 20.
- **No pagination:** Category and search results pages display all results at once. Pagination would improve performance and usability on large result sets.
- **Missing meal thumbnails:** TheMealDB occasionally returns meal objects with empty or missing image URLs. Affected recipe cards render without an image. A future improvement would add a fallback placeholder image for missing thumbnails.

## Reflections

### Challenges

The most technically challenging aspect of this project was managing asynchronous data fetching across multiple pages while maintaining consistent loading and error states. Understanding why `AbortController` is necessary — and what happens without it when a user navigates away before a fetch completes — required revisiting Lesson 2's cleanup patterns in a real-world context rather than an isolated example.

TheMealDB's unconventional data structure also presented challenges. Ingredients stored as numbered properties (`strIngredient1` through `strIngredient20`) rather than an array required a creative solution using `Array.from` with dynamic bracket notation and a TypeScript index signature — patterns that pushed beyond the curriculum into practical problem-solving.

### Design Decisions

`FavoritesContext` was deliberately designed to store only the three fields needed for display (`idMeal`, `strMeal`, `strMealThumb`) rather than full recipe objects. Full recipe details are always fetched fresh from the API when a user visits the detail page — storing the complete object would waste localStorage space and risk displaying stale data if the API updates a recipe.

Interfaces were defined at the component level rather than in a shared `types/index.ts` file. Since each interface describes the shape of a specific API response used in only one place, co-locating the type with the component that uses it is cleaner than maintaining a central types file for types that are never shared.

The `useFetch` hook's URL-as-dependency pattern meant that `CategoryPage` and `SearchPage` automatically re-fetch when their URL parameters change — no additional logic needed. Designing the hook around the URL rather than exposing a manual refetch function kept consuming components simple.

### What I Learned

This project demonstrated how the concepts taught across the Advanced React module — `useState`, `useEffect`, custom hooks, Context API, and React Router — combine into a coherent architecture rather than existing as isolated patterns. Each lesson's concept has a specific role: hooks handle reusable logic, context handles global state, and routing handles navigation — and they compose cleanly when each is used for its intended purpose.

Building `useFetch` and `useLocalStorage` before the page components reinforced why custom hooks exist — by the time `HomePage` was built, fetching data and persisting favorites required one line each, with all complexity hidden in the hooks. The value of that abstraction only becomes clear when you see how much simpler the consuming code is.
