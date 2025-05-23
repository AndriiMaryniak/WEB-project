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
        console.error('Error fetching movie:', error);
        navigate('/');
      }
    };
    fetchMovie();
  }, [id, navigate]);

  const handleBooking = () => {
    const booking = {
      movieId: id,
      movieTitle: movie.title,
      seats: selectedSeats,
      date: new Date().toLocaleString()
    };
    
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    localStorage.setItem('bookings', JSON.stringify([...bookings, booking]));
    navigate('/booking-confirmation');
  };

  if (!movie) return <div className={styles.loading}>Завантаження...</div>;

  return (
    <div className={styles.container}>
      <h1>{movie.title}</h1>
      <p className={styles.subtitle}>Оберіть місця:</p>
      
      <CinemaHall 
        movieId={id}
        onSeatSelect={setSelectedSeats}
      />
      
      <div className={styles.bookingInfo}>
        <h3>Обрані місця: {selectedSeats.join(', ') || '---'}</h3>
        <button
          onClick={handleBooking}
          disabled={!selectedSeats.length}
          className={styles.bookButton}
        >
          Забронювати ({selectedSeats.length})
        </button>
      </div>
      
      <Link to="/" className={styles.backLink}>← Назад до списку</Link>
    </div>
  );
};

export default Booking;