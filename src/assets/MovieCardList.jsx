import EachMovieCard from "./EachMovieCard";
export default function MovieCardList({ movies,handleSelectedId }) {
  return (
    <ul className="list list-movies">
      {
       
        movies?.map((movie) => (
          <EachMovieCard movie={movie} key={movie.imdbID} handleSelectedId={handleSelectedId}/>
        ))
      }
    </ul>
  );
}
