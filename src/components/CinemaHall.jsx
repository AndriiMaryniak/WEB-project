import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './CinemaHall.module.css';

const CinemaHall = ({ movieId, onSeatSelect }) => {
  const [seats, setSeats] = useState([]);
  const rows = 8;
  const cols = 10;

  useEffect(() => {
    const savedSeats = JSON.parse(localStorage.getItem(`seats_${movieId}`) || '[]');
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    
    const occupiedSeats = bookings
      .filter(b => b.movieId === movieId)
      .flatMap(b => b.seats);

    if (savedSeats.length > 0) {
      const updatedSeats = savedSeats.map(seat => ({
        ...seat,
        isBooked: occupiedSeats.includes(seat.id)
      }));
      setSeats(updatedSeats);
    } else {
      const initialSeats = Array.from({ length: rows * cols }, (_, i) => ({
        id: i + 1,
        isBooked: occupiedSeats.includes(i + 1),
        isSelected: false
      }));
      setSeats(initialSeats);
    }
  }, [movieId]);

  const handleSeatClick = (seatId) => {
    const updatedSeats = seats.map(seat => 
      seat.id === seatId ? { ...seat, isSelected: !seat.isSelected } : seat
    );
    
    setSeats(updatedSeats);
    const selected = updatedSeats
      .filter(s => s.isSelected)
      .map(s => s.id);
    onSeatSelect(selected);
    localStorage.setItem(`seats_${movieId}`, JSON.stringify(updatedSeats));
  };

  const groupedSeats = Array.from({ length: rows }, (_, i) =>
    seats.slice(i * cols, (i + 1) * cols)
  );

  return (
    <div className={styles.hallContainer}>
      <div className={styles.screen}>ЕКРАН</div>
      <div className={styles.rowsWrapper}>
        {groupedSeats.map((row, index) => (
          <div key={index} className={styles.row}>
            <div className={styles.rowLabel}>Ряд {index + 1}</div>
            {row.map(seat => (
              <button
                key={seat.id}
                className={`${styles.seat} ${
                  seat.isBooked ? styles.booked :
                  seat.isSelected ? styles.selected : styles.available
                }`}
                onClick={() => handleSeatClick(seat.id)}
                disabled={seat.isBooked}
              >
                {seat.id}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

CinemaHall.propTypes = {
  movieId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onSeatSelect: PropTypes.func.isRequired
};

export default CinemaHall;