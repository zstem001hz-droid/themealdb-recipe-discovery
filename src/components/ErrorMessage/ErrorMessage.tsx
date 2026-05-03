// Displays a styled error message when a data fetch operation fails.
// Accepts the error string returned by useFetch and renders it to the user.
function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="error-container">
      <p className="error-message">⚠️ {message}</p>
    </div>
  )
}

export default ErrorMessage