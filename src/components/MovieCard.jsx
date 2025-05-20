import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './MovieCard.module.css';

const MovieCard = ({ movie }) => {
  return (
    <div className={styles.card}>
      <Link to={`/movie/${movie.id}`} className={styles.cardLink}>
        <div className={styles.posterWrapper}>
          <img
            src={movie.poster}
            alt={movie.title}
            className={styles.poster}
            loading="lazy"
          />
        </div>
        <div className={styles.content}>
          <h3 className={styles.title}>{movie.title}</h3>
          <div className={styles.showtimes}>
            {movie.showtimes.map(time => (
              <div 
                key={time} 
                className={styles.timeBadge}
              >
                {time}
              </div>
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.object.isRequired,
};

export default MovieCard;