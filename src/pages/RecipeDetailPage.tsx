import { useParams, Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Spinner from "../components/Spinner/Spinner";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import { useFavorites } from "../context/FavoritesContext";

// Shape of a full meal object returned by the lookup endpoint
interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strIngredient1: string;
  strIngredient2: string;
  strIngredient3: string;
  strIngredient4: string;
  strIngredient5: string;
  strIngredient6: string;
  strIngredient7: string;
  strIngredient8: string;
  strIngredient9: string;
  strIngredient10: string;
  strIngredient11: string;
  strIngredient12: string;
  strIngredient13: string;
  strIngredient14: string;
  strIngredient15: string;
  strMeasure1: string;
  strMeasure2: string;
  strMeasure3: string;
  strMeasure4: string;
  strMeasure5: string;
  strMeasure6: string;
  strMeasure7: string;
  strMeasure8: string;
  strMeasure9: string;
  strMeasure10: string;
  strMeasure11: string;
  strMeasure12: string;
  strMeasure13: string;
  strMeasure14: string;
  strMeasure15: string;
  [key: string]: string;
}

// Shape of the meal lookup API response
interface MealResponse {
  meals: Meal[] | null;
}

// Fetches and displays full recipe details for the meal ID in the URL.
// Includes ingredients list, instructions, and favorites toggle.
function RecipeDetailPage() {
  // Extracts meal ID from /recipe/:recipeId URL segment
  const { recipeId } = useParams();
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  // Fetches full recipe details by meal ID on mount
  const { data, loading, error } = useFetch<MealResponse>(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`,
  );

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!data?.meals) return <ErrorMessage message="Recipe not found." />;

  const meal = data.meals[0];
  const favorited = isFavorite(meal.idMeal);

  // Builds ingredient list by combining strIngredient and strMeasure fields.
  // TheMealDB stores ingredients as numbered properties up to 20.
  // Filters out empty ingredient slots.
  const ingredients = Array.from({ length: 15 }, (_, i) => {
    const ingredient = meal[`strIngredient${i + 1}`];
    const measure = meal[`strMeasure${i + 1}`];
    return ingredient?.trim()
      ? `${measure?.trim()} ${ingredient.trim()}`
      : null;
  }).filter(Boolean);

  // Toggles favorite status for the current recipe
  function handleFavoriteClick() {
    if (favorited) {
      removeFavorite(meal.idMeal);
    } else {
      addFavorite({
        idMeal: meal.idMeal,
        strMeal: meal.strMeal,
        strMealThumb: meal.strMealThumb,
      });
    }
  }

  return (
    <main className="page-container">
      {/* Back link — returns to home page */}
      <Link to="/" className="back-link">
        ← Back to Categories
      </Link>

      <div className="recipe-detail">
        {/* Recipe header — image, title, category, and favorite toggle */}
        <div className="recipe-header">
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="recipe-img"
          />
          <div className="recipe-meta">
            <h1>{meal.strMeal}</h1>
            <p className="recipe-category">
              {meal.strCategory} · {meal.strArea}
            </p>
            <button
              onClick={handleFavoriteClick}
              className={`favorite-btn ${favorited ? "favorited" : ""}`}
            >
              {favorited ? "❤️ Remove from Favorites" : "🤍 Add to Favorites"}
            </button>
          </div>
        </div>

        {/* Ingredients list built from numbered API properties */}
        <section className="recipe-section">
          <h2>Ingredients</h2>
          <ul className="ingredients-list">
            {ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </section>

        {/* Full cooking instructions */}
        <section className="recipe-section">
          <h2>Instructions</h2>
          <p className="recipe-instructions">{meal.strInstructions}</p>
        </section>
      </div>
    </main>
  );
}

export default RecipeDetailPage;
