import React from 'react';
import { watchMovie, unwatchMovie } from './services/fetch-utils';

export default function MovieListItem({ refreshListDisplay, movie }) {
  async function handleClick() {
    !movie.watched ? await watchMovie(movie.id) : await unwatchMovie(movie.id);
    await refreshListDisplay();
  }
  return (
    <div onClick={handleClick} className="list-item watchlist-item">
      <h1>{movie.watched ? '✅' : '👀'}</h1>
      <h2>{movie.title}</h2>
      <h3>{movie.description}</h3>
      <img
        src={
          movie.poster
            ? `https://image.tmdb.org/t/p/original${movie.poster}`
            : 'http://www.placekitten.com/200/200'
        }
      />
    </div>
  );
}
