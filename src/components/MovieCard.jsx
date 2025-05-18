import React from 'react';
import PropTypes from 'prop-types';
import styles from './MovieCard.module.css';

const MovieCard = ({ movie }) => {
  return (
    <article className={styles.card}>
      <div className={styles.posterWrapper}>
        <img 
          src={movie.poster} 
          alt={movie.title} 
          className={styles.poster}
          loading="lazy"
        />
        <div className={styles.ratingBadge}>{movie.rating}/5</div>
      </div>
      
      <div className={styles.content}>
        <h3 className={styles.title}>{movie.title}</h3>
        
        <div className={styles.meta}>
          <span className={styles.genre}>{movie.genre}</span>
          <span className={styles.duration}>2h 15m</span>
        </div>

        <p className={styles.description}>{movie.description}</p>

        <div className={styles.showtimes}>
          {movie.showtimes.map(time => (
            <button 
              key={time} 
              className={styles.timeButton}
              onClick={() => console.log(`Selected ${time}`)}
            >
              {time}
            </button>
          ))}
        </div>
      </div>
    </article>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    showtimes: PropTypes.arrayOf(PropTypes.string).isRequired,
    rating: PropTypes.number
  }).isRequired
};

export default MovieCard;