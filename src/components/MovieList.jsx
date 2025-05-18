import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FiSearch } from 'react-icons/fi';
import MovieCard from './MovieCard';
import styles from './MovieList.module.css';

const MovieList = ({ movies, loading }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [selectedTime, setSelectedTime] = useState('all');

  const genres = ['all', ...new Set(movies.map(movie => movie.genre))];
  const showtimes = ['all', 'morning', 'afternoon', 'evening'];

  const filterByTime = (time) => {
    const hours = parseInt(time.split(':')[0], 10);
    if (hours < 12) return 'morning';
    if (hours < 17) return 'afternoon';
    return 'evening';
  };

  const filteredMovies = movies.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = selectedGenre === 'all' || movie.genre === selectedGenre;
    const matchesTime = selectedTime === 'all' || 
      movie.showtimes.some(time => filterByTime(time) === selectedTime);
    
    return matchesSearch && matchesGenre && matchesTime;
  });

  return (
    <section className={styles.container}>
      <div className={styles.filters}>
        <div className={styles.searchContainer}>
          <FiSearch className={styles.searchIcon} />
          <input
            type="search"
            placeholder="Пошук фільмів..."
            className={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Пошук фільмів"
          />
        </div>

        <select 
          className={styles.filterSelect}
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
        >
          {genres.map(genre => (
            <option key={genre} value={genre}>
              {genre === 'all' ? 'Всі жанри' : genre}
            </option>
          ))}
        </select>

        <select
          className={styles.filterSelect}
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
        >
          {showtimes.map(time => (
            <option key={time} value={time}>
              {time === 'all' ? 'Весь день' : 
               time === 'morning' ? 'Ранкові' :
               time === 'afternoon' ? 'Денні' : 'Вечірні'}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.grid}>
        {filteredMovies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {!loading && filteredMovies.length === 0 && (
        <div className={styles.emptyState}>
          <h2>Фільмів не знайдено 😕</h2>
          <p>Спробуйте змінити параметри пошуку</p>
        </div>
      )}
    </section>
  );
};

MovieList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired
};

export default MovieList;