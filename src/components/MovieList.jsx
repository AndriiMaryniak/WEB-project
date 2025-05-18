import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MovieCard from './MovieCard';
import styles from './MovieList.module.css';

const MovieList = ({ movies }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className={styles.container}>
      <div className={styles.searchContainer}>
        <input
          type="search"
          placeholder="🔍 Пошук фільмів..."
          className={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Пошук фільмів"
        />
      </div>

      <div className={styles.grid}>
        {filteredMovies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {filteredMovies.length === 0 && (
        <div className={styles.emptyState}>
          <h2>Фільмів не знайдено 😕</h2>
          <p>Спробуйте змінити пошуковий запит</p>
        </div>
      )}
    </section>
  );
};

MovieList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default MovieList;