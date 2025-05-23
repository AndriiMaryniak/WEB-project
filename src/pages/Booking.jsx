import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CinemaHall from '../components/CinemaHall';
import styles from './Booking.module.css';

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
    const bookingData = {
      movieId: id,
      seats: selectedSeats,
      date: new Date().toLocaleString()
    };

    const bookings = JSON.parse(localStorage.getItem('bookings') || []);
    const updatedBookings = [
      ...bookings.filter(b => b.movieId !== id),
      bookingData
    ];
    
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
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