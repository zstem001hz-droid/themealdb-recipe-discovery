import { createContext, useContext, useCallback } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

// Shape of a favorited recipe
interface FavoriteRecipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

// Shape of the FavoritesContext value
interface FavoritesContextType {
  favorites: FavoriteRecipe[];
  addFavorite: (recipe: FavoriteRecipe) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

// Creates FavoritesContext with empty default stubs
const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  addFavorite: () => {},
  removeFavorite: () => {},
  isFavorite: () => false,
});

// Custom hook for consuming FavoritesContext
export function useFavorites() {
  return useContext(FavoritesContext);
}

// Manages global favorites state persisted to localStorage.
// Uses useLocalStorage hook internally for automatic persistence.
export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  // useLocalStorage replaces useState — favorites persist across sessions
  const [favorites, setFavorites] = useLocalStorage<FavoriteRecipe[]>(
    "favorites",
    [],
  );

  // Adds a recipe to favorites if not already saved
  const addFavorite = useCallback(
    (recipe: FavoriteRecipe) => {
      setFavorites([...favorites, recipe]);
    },
    [favorites, setFavorites],
  );

  // Removes a recipe from favorites by meal ID
  const removeFavorite = useCallback(
    (id: string) => {
      setFavorites(favorites.filter((f) => f.idMeal !== id));
    },
    [favorites, setFavorites],
  );

  // Returns true if a recipe ID exists in the favorites list
  const isFavorite = useCallback(
    (id: string) => {
      return favorites.some((f) => f.idMeal === id);
    },
    [favorites],
  );

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}
