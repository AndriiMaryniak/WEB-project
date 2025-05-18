import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import MovieCard from './MovieCard';
import styles from './MovieList.module.css';

const MovieList = ({ movies, selectedTime, setSelectedTime }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    localStorage.setItem('selectedTime', time);
  };

  const filteredMovies = movies.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <section className={styles.container}>
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

      <div className={styles.grid}>
        {filteredMovies.map(movie => (
          <Link to={`/movie/${movie.id}`} key={movie.id} className={styles.cardLink}>
            <MovieCard 
              movie={movie} 
              onTimeSelect={handleTimeSelect}
              selectedTime={selectedTime}
            />
          </Link>
        ))}
      </div>
    </section>
  );
};

MovieList.propTypes = {
  movies: PropTypes.array.isRequired,
  selectedTime: PropTypes.string,
  setSelectedTime: PropTypes.func.isRequired
};

export default MovieList;