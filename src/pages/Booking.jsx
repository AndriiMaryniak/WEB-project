import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CinemaHall from '../components/CinemaHall';
import styles from './Booking.module.css';

const safeParse = (key, defaultValue) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
};

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/movies/${id}`);
        setMovie(response.data);
      } catch (error) {
        console.error('Помилка завантаження фільму:', error);
        navigate('/not-found');
      }
    };
    fetchMovie();
  }, [id, navigate]);

  const handleBooking = () => {
    const bookings = safeParse('bookings', []);
    const existingIndex = bookings.findIndex(b => b.movieId === id);
    
    const newBooking = {
      movieId: id,
      seats: selectedSeats,
      date: new Date().toLocaleString()
    };

    if (existingIndex !== -1) {
      bookings[existingIndex] = newBooking;
    } else {
      bookings.push(newBooking);
    }

    localStorage.setItem('bookings', JSON.stringify(bookings));
    navigate(`/booking-confirmation/${id}`);
  };

  if (!movie) return <div className={styles.loading}>Завантаження...</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{movie.title}</h1>
      <p className={styles.subtitle}>Оберіть місця у кінозале</p>
      
      <CinemaHall 
        movieId={id}
        onSeatSelect={setSelectedSeats}
      />
      
      <div className={styles.bookingPanel}>
        <h3 className={styles.selectedTitle}>Обрані місця:</h3>
        <div className={styles.selectedSeats}>
          {selectedSeats.length > 0 
            ? selectedSeats.join(', ') 
            : 'Ще не обрано'}
        </div>
        <button
          onClick={handleBooking}
          disabled={!selectedSeats.length}
          className={styles.bookButton}
        >
          Підтвердити ({selectedSeats.length})
        </button>
        
        <Link to={`/movie/${id}`} className={styles.backLink}>
          ← Назад до фільму
        </Link>
      </div>
    </div>
  );
};

export default Booking;