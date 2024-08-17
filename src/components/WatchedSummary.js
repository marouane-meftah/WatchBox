const average = (arr) => {
  const sum = arr.reduce((acc, cur) => acc + cur, 0); // Calculate the sum of all elements
  const avg = sum / arr.length; // Calculate the average
  return avg.toFixed(2); // Return the average with two decimal places
};
export default function WatchedSummary({ watched }) {
  const avgImdbRating =
    watched.length > 0 ? average(watched.map((movie) => movie.imdbRating)) : 0;
  const avgUserRating =
    watched.length > 0 ? average(watched.map((movie) => movie.userRating)) : 0;
  const avgRuntime =
    watched.length > 0 ? average(watched.map((movie) => movie.runtime)) : 0;

  return (
    <div className="summary marou">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>
            {watched.length}
            {watched.length === 0 || watched.length === 1
              ? " movie"
              : " movies"}
          </span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}
