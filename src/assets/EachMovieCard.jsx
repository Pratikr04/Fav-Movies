export default function EachMovieCard({ movie, handleSelectedId }) {
  return (
    <li
      onClick={() =>
        handleSelectedId((prevId) =>
          prevId === movie.imdbID ? null : movie.imdbID
        )
      }
    >
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}
