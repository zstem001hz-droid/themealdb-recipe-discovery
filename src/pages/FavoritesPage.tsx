import { Link } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext'
import RecipeCard from '../components/RecipeCard/RecipeCard'

// Displays all recipes the user has saved to their favorites list.
// Data comes from FavoritesPage localStorage.
function FavoritesPage() {
  const { favorites } = useFavorites()

  // Empty state — shown when no recipes have been favorited yet
  if (favorites.length === 0) {
    return (
      <main className="page-container">
        <h1>Your Favorites</h1>
        <p>You haven't saved any recipes yet.</p>
        <Link to="/" className="back-link">Browse Categories</Link>
      </main>
    )
  }

  return (
    <main className="page-container">
      <h1>Your Favorites</h1>

      {/* Meal grid — reuses existing meal-grid and RecipeCard styles */}
      <div className="meal-grid">
        {favorites.map(recipe => (
          <RecipeCard
            key={recipe.idMeal}
            idMeal={recipe.idMeal}
            strMeal={recipe.strMeal}
            strMealThumb={recipe.strMealThumb}
          />
        ))}
      </div>
    </main>
  )
}

export default FavoritesPage