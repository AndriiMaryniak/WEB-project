import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import MovieCard from './MovieCard';
import styles from './MovieList.module.css';
const MovieList = ({
movies,
selectedTime,
setSelectedTime,
selectedGenre,
setSelectedGenre,
loading
}) => {
const [searchTerm, setSearchTerm] = useState('');
const genres = ['all', ...new Set(movies.map(movie => movie.genre))];
const handleGenreSelect = (genre) => {
setSelectedGenre(prev => prev === genre ? 'all' : genre);
};
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
<div className={styles.genreFilters}>
{genres.map(genre => (
<button
key={genre}
className={`${styles.genreButton} ${
selectedGenre === genre ? styles.activeGenre : ''
}`}
onClick={() => handleGenreSelect(genre)}
>
{genre === 'all' ? 'Усі' : genre}
</button>
))}
</div>
<div className={styles.timeFilters}>
{['all', 'morning', 'afternoon', 'evening'].map(time => (
<button
key={time}
className={`${styles.timeButton} ${
selectedTime === time ? styles.activeTime : ''
}`}
onClick={() => setSelectedTime(time)}
>
{time === 'all' ? 'Весь день' :
time === 'morning' ? 'Ранок' :
time === 'afternoon' ? 'День' : 'Вечір'}
</button>
))}
</div>
<div className={styles.grid}>
{filteredMovies.map(movie => (
<Link
to={`/movie/${movie.id}`}
key={movie.id}
className={styles.cardLink}
>
<MovieCard movie={movie} selectedTime={selectedTime} />
</Link>
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
movies: PropTypes.array.isRequired,
selectedTime: PropTypes.string.isRequired,
setSelectedTime: PropTypes.func.isRequired,
selectedGenre: PropTypes.string.isRequired,
setSelectedGenre: PropTypes.func.isRequired,
loading: PropTypes.bool.isRequired
};
export default MovieList;