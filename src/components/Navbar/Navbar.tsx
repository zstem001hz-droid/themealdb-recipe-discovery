import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

// Site-wide navigation with search bar.
// NavLink highlights the active route automatically.
// Search input navigates to /search on submission.
function Navbar() {
  // Tracks the current search input value
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  // Navigates to search results page with query as URL parameter
  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim() === "") return;
    navigate(`/search?query=${query.trim()}`);
    setQuery("");
  }

  return (
    <nav className="navbar">
      {/* Brand link — always navigates to home */}
      <NavLink to="/" className="navbar-brand">
        🥘 Recipe Discovery
      </NavLink>

      {/* Primary navigation links */}
      <div className="navbar-links">
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/favorites">Favorites</NavLink>
      </div>

      {/* Search form — submits to /search?query=... */}
      <form onSubmit={handleSearch} className="navbar-search">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search recipes..."
        />
        <button type="submit">Search</button>
      </form>
    </nav>
  );
}

export default Navbar;
