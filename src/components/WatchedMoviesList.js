import WatchedMovie from "./WatchedMovie";

export default function WatchedMoviesList({ watched, handleRemoveMovie }) {
    return (
      <ul className="list">
        {watched.map((movie) => (
          <WatchedMovie
            movie={movie}
            key={movie.imdbID}
            handleRemoveMovie={handleRemoveMovie}
          />
        ))}
      </ul>
    );
  }