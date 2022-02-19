import { useState, useEffect } from 'react';
import MovieList from './MovieList';
import { getWatchList } from './services/fetch-utils';

export default function WatchListPage() {
  const [movies, setMovies] = useState([]);
  async function refreshListDisplay() {
    const watchList = await getWatchList();
    setMovies(watchList);
  }
  useEffect(() => {
    refreshListDisplay();
  }, []);

  return (
    <div>
      <h3>
        <em>Movies to watch:</em>
        <MovieList movies={movies} refreshListDisplay={refreshListDisplay} />
      </h3>
    </div>
  );
}
