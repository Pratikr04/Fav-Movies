import { useState, useEffect } from "react";
const KEY = "38035736";

export function useMovie(query) {
  const [movies, setMovies] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");

  useEffect(
    function () {
      const controller = new AbortController();
      async function fetchMovies() {
        try {
          setIsLoading(true);
          setIsError("");
          // const response = await fetch(`https://www.omdbapi.com/?apikey=38035736&s=${searchTerm}`);


          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${KEY}&s=
${query}`,
            { signal: controller.signal }
          );

          if (!res.ok)
            throw new Error("Something went Wrong please try again later");

          const data = await res.json();

          if (data.Response === "False") throw new Error(data.Error);

          setMovies(data.Search);
          setIsError("");
        } catch (err) {
          if (err.name !== "AbortError") setIsError(err.message);
        } finally {
          setIsLoading(false);
        }
      }
      if (query.length < 3) {
        setMovies([]);
        setIsError("");
        return;
      }

      // setSelectedId(null);
      fetchMovies();

      return function () {
        controller.abort();
      };
    },
    [query]
  );
  return { movies, isloading, isError };
}
