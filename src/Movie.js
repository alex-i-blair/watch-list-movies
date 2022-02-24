import React from 'react';
import { useHistory } from 'react-router-dom';
import { addToWatchList } from './services/fetch-utils';

export default function Movie({ movie, isOnWatchList, refreshListDisplay }) {
  const haveWatched = isOnWatchList(movie.id);
  const history = useHistory();
  async function handleClick() {
    if (!haveWatched) {
      const listItem = {
        title: movie.title,
        api_id: movie.id,
        description: movie.overview,
        poster: movie.poster_path,
      };
      await addToWatchList(listItem);
      await refreshListDisplay();
      history.push('/watchlist');
    }
  }

  return (
    <div onClick={handleClick} className={`list-item ${haveWatched ? 'watched' : ''}`}>
      <h3>{movie.title}</h3>
      <h3>{movie.overview}</h3>
      <p>
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
              : 'http://www.placekitten.com/200/200'
          }
        />
      </p>
    </div>
  );
}
