import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { QRCodeSVG } from 'qrcode.react'; // Виправлений імпорт
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

  const qrData = JSON.stringify({
    movie: movie.title,
    showtime: booking.showtime,
    seats: booking.seats,
    date: booking.date
  });

  return (
    <div className={styles.container}>
      <h1>Бронювання підтверджено! 🎉</h1>
      <div className={styles.ticket}>
        <h2>{movie.title}</h2>
        <p><strong>Час сеансу:</strong> {booking.showtime}</p>
        <p><strong>Місця:</strong> {booking.seats.join(', ')}</p>
        <p><strong>Ряд:</strong> {booking.seats[0].split('-')[0]}</p>
        <p><strong>Дата бронювання:</strong> {booking.date}</p>
        
        <div className={styles.qrContainer}>
          <QRCodeSVG 
            value={qrData} 
            size={200}
            level="H"
            includeMargin={true}
            fgColor="#2c3e50"
          />
          <p className={styles.qrCaption}>Пред'явіть цей QR-код на касі</p>
        </div>
      </div>
      <Link to="/" className={styles.homeButton}>На головну</Link>
    </div>
  );
};

export default BookingConfirmation;