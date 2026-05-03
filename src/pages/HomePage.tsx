import useFetch from '../hooks/useFetch'
import Spinner from '../components/Spinner/Spinner'
import ErrorMessage from '../components/ErrorMessage/ErrorMessage'
import { Link } from 'react-router-dom'

// Shape of a single category returned by TheMealDB categories endpoint
interface Category {
  idCategory: string
  strCategory: string
  strCategoryThumb: string
  strCategoryDescription: string
}

// Shape of the categories API response
interface CategoriesResponse {
  categories: Category[]
}

// Fetches and displays all recipe categories as a navigable grid.
// Each category card links to its dynamic category page.
function HomePage() {

  // Fetches all categories from TheMealDB on mount
  const { data, loading, error } = useFetch<CategoriesResponse>(
    'https://www.themealdb.com/api/json/v1/1/categories.php'
  )

  if (loading) return <Spinner />
  if (error) return <ErrorMessage message={error} />

  return (
    <main className="page-container">
      <h1>Browse Recipes by Category</h1>

      {/* Category grid — each card navigates to /category/:categoryName */}
      <div className="category-grid">
        {data?.categories.map(category => (
          <Link
            to={`/category/${category.strCategory}`}
            key={category.idCategory}
            className="category-card"
          >
            <img
              src={category.strCategoryThumb}
              alt={category.strCategory}
              className="category-img"
            />
            <h3>{category.strCategory}</h3>
          </Link>
        ))}
      </div>
    </main>
  )
}

export default HomePage
