// Displays a centered loading indicator during data fetch operations. 
// Rendered by any page compnent while useFetch loading state is true
function Spinner() {
    return (
        <div className="spinner-container">
            <div className="spinner" />
            <p>Loading ...</p>
        </div>
    )
}

export default spinner