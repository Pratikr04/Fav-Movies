import ListWatched from "./ListWatched";

export default function WatchedMovieList({watched,handleDelete}){
  return  <ul className="list">
  {watched.map((movie) => (
    <ListWatched movie={movie} key={movie.imdbID} handleDelete={handleDelete}/>
  ))}
</ul>;
}









