import React from 'react';
import { useParams, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './MovieCard.module.css';

const MovieDetails = ({ movies }) => {
  const { id } = useParams();
  const movie = movies.find(m => m.id === parseInt(id, 10));

  return (
    <div className={styles.detailsContainer}>
      {movie ? (
        <>
          <h2>{movie.title}</h2>
          <img src={movie.poster} alt={movie.title} className={styles.detailsPoster} />
          <p className={styles.fullDescription}>{movie.description}</p>
          <div className={styles.showtimes}>
            Сеанси: {movie.showtimes.join(', ')}
          </div>
          <Link to="/" className={styles.backButton}>← На головну</Link>
        </>
      ) : (
        <div className={styles.error}>
          <h2>Фільм не знайдено 😕</h2>
          <Link to="/" className={styles.backButton}>Повернутися</Link>
        </div>
      )}
    </div>
  );
};

MovieDetails.propTypes = {
  movies: PropTypes.array.isRequired
};

export default MovieDetails;