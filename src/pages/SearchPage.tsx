import { useSearchParams, Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Spinner from "../components/Spinner/Spinner";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import RecipeCard from "../components/RecipeCard/RecipeCard";

// Shape of a meal returned by the search endpoint
interface SearchMeal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

// Shape of the search API response
interface SearchResponse {
  meals: SearchMeal[] | null;
}

// Displays search results for the query passed as a URL search parameter.
// Reads ?query= from the URL using useSearchParams — no prop drilling needed.
function SearchPage() {
  // Reads the ?query= parameter from the current URL
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  // Fetches meals matching the search query — re-fetches when query changes
  const { data, loading, error } = useFetch<SearchResponse>(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`,
  );

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <main className="page-container">
      <h1>Search Results for "{query}"</h1>

      {/* Back link — returns user to home page */}
      <Link to="/" className="back-link">
        ← Back to Categories
      </Link>

      {/* No results state — TheMealDB returns null meals when nothing matches */}
      {data?.meals === null && (
        <p>No recipes found for "{query}". Try a different search term.</p>
      )}

      {/* Results grid — reuses meal-grid and RecipeCard */}
      {data?.meals && (
        <div className="meal-grid">
          {data.meals.map((meal) => (
            <RecipeCard
              key={meal.idMeal}
              idMeal={meal.idMeal}
              strMeal={meal.strMeal}
              strMealThumb={meal.strMealThumb}
            />
          ))}
        </div>
      )}
    </main>
  );
}

export default SearchPage;
