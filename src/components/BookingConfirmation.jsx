import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import styles from './BookingConfirmation.module.css';

const BookingConfirmation = () => {
  const { movieId, showtime } = useParams();
  const [movie, setMovie] = useState(null);
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const movieResponse = await axios.get(`http://localhost:3001/movies/${movieId}`);
      const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
      const lastBooking = bookings.find(
        b => b.movieId === movieId && b.showtime === showtime
      );
      setMovie(movieResponse.data);
      setBooking(lastBooking);
    };
    fetchData();
  }, [movieId, showtime]);

  if (!movie || !booking) return <div className={styles.loading}>Завантаження...</div>;

  return (
    <div className={styles.container}>
      <h1>Бронювання успішне! 🎉</h1>
      <div className={styles.ticket}>
        <h2>{movie.title}</h2>
        <p>Час сеансу: {booking.showtime}</p>
        <p>Місця: {booking.seats.join(', ')}</p>
        <p>Дата бронювання: {booking.date}</p>
        <div className={styles.qr}>QR-код для сканування</div>
      </div>
      <Link to="/" className={styles.homeButton}>На головну</Link>
    </div>
  );
};

export default BookingConfirmation;