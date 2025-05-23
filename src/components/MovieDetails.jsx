import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './MovieDetails.module.css';

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/movies/${id}`);
        setMovie(response.data);
      } catch (error) {
        console.error('Помилка завантаження фільму:', error);
        navigate('/not-found', { replace: true });
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id, navigate]);

  if (loading) return <div className={styles.loading}>Завантаження...</div>;
  if (!movie) return null;

  return (
    <div className={styles.container}>
      <div className={styles.posterContainer}>
        <img 
          src={movie.poster} 
          alt={movie.title} 
          className={styles.poster}
        />
      </div>
      
      <div className={styles.detailsContent}>
        <h1>{movie.title}</h1>
        <div className={styles.metaInfo}>
          <span>Рейтинг: ⭐ {movie.rating}</span>
          <span>Тривалість: 🕒 {movie.duration} хв</span>
          <span>Жанр: {movie.genre}</span>
        </div>
        
        <p className={styles.description}>{movie.description}</p>
        
        <div className={styles.showtimesSection}>
          <h2>Оберіть час сеансу:</h2>
          <div className={styles.timeButtons}>
            {movie.showtimes.map(time => (
              <Link
                key={time}
                to={`/book/${movie.id}/${time}`}
                className={styles.timeButton}
              >
                {time}
              </Link>
            ))}
          </div>
        </div>
        
        <Link to="/" className={styles.backLink}>
          ← Повернутися на головну
        </Link>
      </div>
    </div>
  );
};

export default MovieDetails;