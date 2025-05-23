import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { QRCodeSVG } from 'qrcode.react';
import styles from './BookingConfirmation.module.css';

const BookingConfirmation = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookings = JSON.parse(localStorage.getItem('bookings') || []);
        const lastBooking = bookings.find(b => b.movieId === movieId);
        
        if (lastBooking) {
          const movieResponse = await axios.get(
            `http://localhost:3001/movies/${movieId}`
          );
          setMovie(movieResponse.data);
          setBooking(lastBooking);
        }
      } catch (error) {
        console.error('Помилка отримання даних:', error);
      }
    };
    fetchData();
  }, [movieId]);

  if (!movie || !booking) {
    return <div className={styles.loading}>Завантаження...</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Бронювання підтверджено! 🎉</h1>
      
      <div className={styles.ticket}>
        <h2 className={styles.movieTitle}>{movie.title}</h2>
        
        <div className={styles.details}>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Місця:</span>
            <span className={styles.detailValue}>
              {booking.seats.join(', ')}
            </span>
          </div>
          
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Дата:</span>
            <span className={styles.detailValue}>{booking.date}</span>
          </div>
        </div>
        
        <div className={styles.qrWrapper}>
          <QRCodeSVG 
            value={JSON.stringify({
              movie: movie.title,
              seats: booking.seats,
              date: booking.date
            })}
            size={200}
            level="H"
            includeMargin
            fgColor="#2c3e50"
          />
          <p className={styles.qrNote}>Пред'явіть QR-код на касі</p>
        </div>
      </div>
      
      <Link to="/" className={styles.homeButton}>
        На головну сторінку
      </Link>
    </div>
  );
};

export default BookingConfirmation;