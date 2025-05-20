import React from 'react';
import PropTypes from 'prop-types';
import { FiSearch } from 'react-icons/fi';
import MovieCard from './MovieCard';
import styles from './MovieList.module.css';

const MovieList = ({
  movies,
  selectedGenre,
  setSelectedGenre,
  selectedTime,
  setSelectedTime
}) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  
  const genres = ['all', ...new Set(movies.flatMap(movie => 
    movie.genre.split(', ').map(g => g.trim())
  ))];
  
  const filterByTime = (time) => {
    const hours = parseInt(time.split(':')[0], 10);
    if (hours < 12) return 'morning';
    if (hours < 17) return 'afternoon';
    return 'evening';
  };

  const filteredMovies = movies.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = selectedGenre === 'all' || movie.genre.includes(selectedGenre);
    const matchesTime = selectedTime === 'all' || 
      movie.showtimes.some(time => filterByTime(time) === selectedTime);
    
    return matchesSearch && matchesGenre && matchesTime;
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
        />
      </div>

      <div className={styles.filters}>
        <div className={styles.genreFilters}>
          {genres.map(genre => (
            <button
              key={genre}
              className={`${styles.filterButton} ${
                selectedGenre === genre ? styles.active : ''
              }`}
              onClick={() => setSelectedGenre(genre === selectedGenre ? 'all' : genre)}
            >
              {genre === 'all' ? 'Усі жанри' : genre}
            </button>
          ))}
        </div>

        <div className={styles.timeFilters}>
          {['all', 'morning', 'afternoon', 'evening'].map(time => (
            <button
              key={time}
              className={`${styles.filterButton} ${
                selectedTime === time ? styles.active : ''
              }`}
              onClick={() => setSelectedTime(time)}
            >
              {time === 'all' ? 'Весь день' : 
               time === 'morning' ? 'Ранок' : 
               time === 'afternoon' ? 'День' : 'Вечір'}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.grid}>
        {filteredMovies.map(movie => (
          <MovieCard 
            key={movie.id} 
            movie={movie} 
          />
        ))}
      </div>

      {filteredMovies.length === 0 && (
        <div className={styles.emptyState}>
          <h2>Фільмів не знайдено 😕</h2>
          <p>Спробуйте змінити параметри пошуку</p>
        </div>
      )}
    </section>
  );
};

MovieList.propTypes = {
  movies: PropTypes.array.isRequired,
  selectedGenre: PropTypes.string.isRequired,
  setSelectedGenre: PropTypes.func.isRequired,
  selectedTime: PropTypes.string.isRequired,
  setSelectedTime: PropTypes.func.isRequired
};

export default MovieList;