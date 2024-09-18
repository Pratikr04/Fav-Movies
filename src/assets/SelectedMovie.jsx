import { useState, useEffect, useRef } from "react";
import { KEY } from "./App";
import Loader from "./Loader";
import StarRating from "./StarRating";
import { useKeyPress } from "./useKeyPress";

export function SelectedMovie({
  selectedId,
  handleSelectedId,
  handleWatchedMovieList,
  watched,
}) {
  const [currentMovie, setCurrentMovie] = useState({});

  const [loader, setLoader] = useState(false);

  const [userRating, setUserRating] = useState("");

  const isWatched = watched
    .map((currMovie) => currMovie.imdbID)
    .includes(selectedId);
  const currentRating = watched.find(
    (element) => element.imdbID === selectedId
  )?.userRating;

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = currentMovie;

  const countRef = useRef(0);

  useKeyPress("Escape", handleSelectedId);

  useEffect(() => {
    if (userRating) countRef.current++;
  }, [userRating]);

  function handleAdd() {
    const watchedMovie = {
      imdbID: selectedId,
      poster,
      title,
      year,
      runtime: Number(runtime.split(" ").at(0)),
      imdbRating: Number(imdbRating),
      userRating,
      countFinalStar: countRef.current,
    };
    handleWatchedMovieList(watchedMovie);
    handleSelectedId(null);
  }

  useEffect(
    function () {
      async function selectedMovie() {
        setLoader(true);
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${KEY}&i=
${selectedId}`
        );
        const data = await res.json();

        setCurrentMovie(data);
        setLoader(false);
      }
      selectedMovie();
    },
    [selectedId]
  );

  useEffect(
    function () {
      if (!title) return;

      document.title = `Movie | ${title}`;

      return function () {
        document.title = "usePopcorn";
      };
    },
    [title]
  );

  return (
    <div className="details">
      {loader ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={() => handleSelectedId(null)}>
              &larr;
            </button>
            <img src={poster} alt={title} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>🌟</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={22}
                    setMovieRating={setUserRating}
                  />
                  {userRating && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add to the WatchedList
                    </button>
                  )}
                </>
              ) : (
                <p>
                  You have already rated this movie with {currentRating}
                  <span>🌟</span>
                </p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Actoes {actors}</p>
            <p> Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}
