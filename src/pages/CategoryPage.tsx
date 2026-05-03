import { useParams, Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Spinner from "../components/Spinner/Spinner";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";

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

      {/* Meal grid — each card links to the recipe detail page */}
      <div className="meal-grid">
        {data?.meals?.map((meal) => (
          <Link
            to={`/recipe/${meal.idMeal}`}
            key={meal.idMeal}
            className="meal-card"
          >
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className="meal-img"
            />
            <h3>{meal.strMeal}</h3>
          </Link>
        ))}
      </div>

      {/* Handles case where category exists but has no meals */}
      {data?.meals === null && <p>Apologies, we do not have recipies for your desired categories.</p>}
    </main>
  );
}

export default CategoryPage;
