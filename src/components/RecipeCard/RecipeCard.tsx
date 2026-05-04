import { Link } from "react-router-dom";
import { useFavorites } from "../../context/FavoritesContext";

// Shape of the meal data RecipeCard expects as props
interface RecipeCardProps {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

// Reusable recipe preview card with favorite toggle.
// Used on CategoryPage, FavoritesPage, and SearchPage.
// Links to the full recipe detail page on click.
function RecipeCard({ idMeal, strMeal, strMealThumb }: RecipeCardProps) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  // Checks if this recipe is currently in the favorites list
  const favorited = isFavorite(idMeal);

  // Toggles favorite status — adds if not favorited, removes if favorited
  function handleFavoriteClick(e: React.MouseEvent) {
    // Prevents the Link navigation from firing when clicking the button
    e.preventDefault();
    if (favorited) {
      removeFavorite(idMeal);
    } else {
      addFavorite({ idMeal, strMeal, strMealThumb });
    }
  }

  return (
    <Link to={`/recipe/${idMeal}`} className="meal-card">
      <img src={strMealThumb} alt={strMeal} className="meal-img" />
      <h3>{strMeal}</h3>

      {/* Favorite toggle button — e.preventDefault stops Link navigation */}
      <button
        onClick={handleFavoriteClick}
        className={`favorite-btn ${favorited ? "favorited" : ""}`}
        aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
      >
        {favorited ? "❤️" : "🤍"}
      </button>
    </Link>
  );
}

export default RecipeCard;
