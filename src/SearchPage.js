import { useState, useEffect } from 'react';
import MovieList from './MovieList';
import Movielist from './MovieList';
import { searchMovies, getWatchList } from './services/fetch-utils';

export default function SearchPage() {
  const [search, setSearch] = useState('');
  const [movies, setMovies] = useState([]);
  const [watchList, setWatchList] = useState([]);

  async function handleSearch(e) {
    e.preventDefault();
    const response = await searchMovies(search);
    setMovies(response);
  }

  function isOnWatchList(api_id) {
    const match = watchList.find((item) => Number(item.api_id) === Number(api_id));
    return Boolean(match);
  }

  async function refreshListDisplay() {
    const myList = await getWatchList();
    setWatchList(myList);
  }

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
        <button>Search</button>
      </form>
      <section>
        <MovieList
          movies={movies}
          isOnWatchList={isOnWatchList}
          refreshListDisplay={refreshListDisplay}
        />
      </section>
    </div>
  );
}
