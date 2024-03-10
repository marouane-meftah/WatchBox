export default function Search({ query, setQuery }) {
    return (
      <div className="searchInput">
        <input
          className="search"
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query.length > 0 && (
          <button className="btn-clear" onClick={() => setQuery("")}>
            x
          </button>
        )}
      </div>
    );
  }