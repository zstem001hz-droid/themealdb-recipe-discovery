import { Link } from "react-router-dom";

// Renders for any URL that doesn't match a defined route.
// Provides clear feedback and navigation back to the home page.
function NotFoundPage() {
  return (
    <main className="page-container not-found">
      <h1>404</h1>
      <p>Oops — that page doesn't exist.</p>
      <Link to="/" className="back-link">
        ← Back to Home
      </Link>
    </main>
  );
}

export default NotFoundPage;
