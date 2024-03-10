import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import Search from "./components/Search";
import NumResults from "./components/NumResults";
import Main from "./components/Main";
import SearchBox from "./components/SearchBox";
import Box from "./components/Box";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import MovieList from "./components/MovieList";
import MovieDetails from "./components/MovieDetails";
import WatchedSummary from "./components/WatchedSummary";
import WatchedMoviesList from "./components/WatchedMoviesList";

const KEY = "86499953";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedId, setSelectedId] = useState("");

  useEffect(
    function () {
      const controller = new AbortController();
      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );
          if (!res.ok) throw new Error("somthing went wrong with fetching");

          const data = await res.json();
          // console.log(data);

          if (data.Response === "False") throw new Error("No movies found");

          setMovies(data.Search);
        } catch (err) {
          if (err.name !== "AbortError") {
            console.log(err);
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }
      if (query.length < 3) {
        setMovies([]);
        setError("");
        setIsLoading(false);
        return;
      }
      fetchMovies();

      return function () {
        controller.abort();
      };
    },
    [query]
  );

  function handleRemoveMovie(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  return (
    <>
      <NavBar>
        {!selectedId && <Search query={query} setQuery={setQuery} />}
        <NumResults watched={watched} />
      </NavBar>

      <Main>
        {query.length > 2 && !selectedId && (
          <SearchBox>
            {isLoading && <Loader />}
            {!isLoading && !error && movies.length > 0 && (
              <MovieList movies={movies} onSelectMovie={setSelectedId} />
            )}
            {error && <ErrorMessage message={error} />}
          </SearchBox>
        )}

        {selectedId ? (
          <Box>
            {isLoading ? (
              <Loader />
            ) : (
              <MovieDetails
                selectedId={selectedId}
                setSelectedId={setSelectedId}
                setWatched={setWatched}
                clearQuery={setQuery}
                watched={watched}
              />
            )}
          </Box>
        ) : (
          <Box>
            <WatchedSummary watched={watched} />
            <WatchedMoviesList
              watched={watched}
              handleRemoveMovie={handleRemoveMovie}
            />
          </Box>
        )}
      </Main>
    </>
  );
}
