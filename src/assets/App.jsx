import { useState } from "react";
import NavBar from "./NavBar";
import NumResult from "./NumResult";
import Main from "./main";
import Box from "./Box";
import Summary from "./Summary";
import WatchedMovieList from "./WatchedMovieList";
import MovieCardList from "./MovieCardList";
import Loader from "./Loader";
import { ErrorMessages } from "./ErrorMessages";
import SearchBar from "./SearchBar";

import { SelectedMovie } from "./SelectedMovie";
import { useMovie } from "./useMovie";
import { useLocalStorage } from "./useLocalStorage";

export const KEY = "38035736";
export default function App() {
  const [query, setQuery] = useState("");

  const [selectedId, setSelectedId] = useState(null);

  const { movies, isloading, isError } = useMovie(query);

  const [watched, setWatched] = useLocalStorage([], "currentMovie");
   
  function handleWatchedMovieList(watchedMovie) {
    setWatched((currentMovie) => [...currentMovie, watchedMovie]);
  }

  function handleDelete(deleteId) {
    setWatched((currentMovie) =>
      currentMovie.filter((movie) => movie.imdbID !== deleteId)
    );
  }

  function handleSelectedId(data) {
    setSelectedId(data);
  }

  return (
    <>
      <NavBar>
        <SearchBar query={query} setQuery={setQuery} />
        <NumResult movies={movies} />
      </NavBar>
      <Main>
        <Box>
          {isloading && <Loader />}
          {!isloading && !isError && (
            <MovieCardList
              movies={movies}
              handleSelectedId={handleSelectedId}
            />
          )}
          {isError && <ErrorMessages message={isError} />}
        </Box>

        <Box>
          {selectedId ? (
            <>
              <SelectedMovie
                selectedId={selectedId}
                handleSelectedId={handleSelectedId}
                handleWatchedMovieList={handleWatchedMovieList}
                watched={watched}
              />
            </>
          ) : (
            <>
              <Summary watched={watched} />
              <WatchedMovieList watched={watched} handleDelete={handleDelete} />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
