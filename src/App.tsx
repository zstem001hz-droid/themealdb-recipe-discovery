import "./App.css";
import { Routes, Route } from "react-router-dom";
import { FavoritesProvider } from "./context/FavoritesContext";
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import RecipeDetailPage from "./pages/RecipeDetailPage";
import FavoritesPage from "./pages/FavoritesPage";
import SearchPage from "./pages/SearchPage";
import NotFoundPage from "./pages/NotFoundPage";

// Root component - defines all application routes
function App() {
  return (
    <FavoritesProvider>
      {/* Navbar renders above all route content on every page */}

      <Navbar />

      {/* Routes renders only the first matching route */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route path="/recipe/:recipeId" element={<RecipeDetailPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/search" element={<SearchPage />} />
        {/* Catch-all — renders for any unmatched path */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </FavoritesProvider>
  );
}

export default App;
