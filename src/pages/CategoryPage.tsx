import { useParams, Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Spinner from "../components/Spinner/Spinner";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import RecipeCard from "../components/RecipeCard/RecipeCard";

// Shape of a single meal returned by the category filter endpoint
interface CategoryMeal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

// Shape of the category filter API response
interface CategoryResponse {
  meals: CategoryMeal[] | null;
}

// Fetches and displays all recipes belonging to the category in the URL.
// Uses useParams to extract categoryName from the dynamic route segment.
function CategoryPage() {
  // Extracts category name from /category/:categoryName URL segment
  const { categoryName } = useParams();

  // Fetches all meals for the current category on mount or category change
  const { data, loading, error } = useFetch<CategoryResponse>(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`,
  );

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <main className="page-container">
      <h1>{categoryName} Recipes</h1>

      {/* Back link — returns user to the category grid */}
      <Link to="/" className="back-link">
        ⬅️ Return to Categories
      </Link>

      <div className="meal-grid">
        {data?.meals?.map((meal) => (
          <RecipeCard
            key={meal.idMeal}
            idMeal={meal.idMeal}
            strMeal={meal.strMeal}
            strMealThumb={meal.strMealThumb}
          />
        ))}
      </div>

      {/* Handles case where category exists but has no meals */}
      {data?.meals === null && (
        <p>    No recipes found for ‘{query}’. Try a different keyword or remove filters.</p>
      )}
    </main>
  );
}

export default CategoryPage;
