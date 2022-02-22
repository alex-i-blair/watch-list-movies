import { useLocation } from 'react-router-dom';
import Movie from './Movie';
import MovieListItem from './MovieListItem';

export default function MovieList({ movies, refreshListDisplay, isOnWatchList }) {
  const location = useLocation();

  return (
    <div className="movie-list">
      {movies.map((movie, i) =>
        location.pathname.includes('search') ? (
          <Movie
            key={movie.title + i}
            movie={movie}
            isOnWatchList={isOnWatchList}
            refreshListDisplay={refreshListDisplay}
          />
        ) : (
          <MovieListItem
            key={movie.title + i}
            refreshListDisplay={refreshListDisplay}
            movie={movie}
          />
        )
      )}
    </div>
  );
}
