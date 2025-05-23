import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './MovieCard.module.css';

const MovieCard = ({ movie }) => {
  return (
    <div className={styles.card}>
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
            <Link
              key={time}
              to={`/booking/${movie.id}`}
              className={styles.timeButton}
            >
              {time}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    showtimes: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired
};

export default MovieCard;