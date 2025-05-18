import React from 'react';
import { useParams, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './MovieCard.module.css';

const MovieDetails = ({ movies }) => {
  const { id } = useParams();
  const movie = movies.find(m => m.id === parseInt(id));

  return (
    <div className={styles.detailsContainer}>
      {movie ? (
        <>
          <h2>{movie.title}</h2>
          <img src={movie.poster} alt={movie.title} className={styles.detailsPoster} />
          <p className={styles.fullDescription}>{movie.description}</p>
          <Link to="/" className={styles.backButton}>← На головну</Link>
        </>
      ) : (
        <div className={styles.error}>Фільм не знайдено</div>
      )}
    </div>
  );
};

MovieDetails.propTypes = {
  movies: PropTypes.array.isRequired
};

export default MovieDetails;