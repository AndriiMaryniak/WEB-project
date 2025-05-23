import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './CinemaHall.module.css';

const CinemaHall = ({ movieId, onSeatSelect }) => {
  const [seats, setSeats] = useState([]);
  const rows = 8;
  const cols = 10;

  useEffect(() => {
    const savedSeats = JSON.parse(localStorage.getItem(`seats_${movieId}`) || '[]');
    if (savedSeats.length > 0) {
      setSeats(savedSeats);
    } else {
      const initialSeats = Array.from({ length: rows * cols }, (_, i) => ({
        id: i + 1,
        isBooked: Math.random() < 0.3,
        isSelected: false
      }));
      setSeats(initialSeats);
    }
  }, [movieId]);

  const handleSeatClick = (seatId) => {
    const updatedSeats = seats.map(seat => {
      if (seat.id === seatId && !seat.isBooked) {
        return { ...seat, isSelected: !seat.isSelected };
      }
      return seat;
    });
    
    setSeats(updatedSeats);
    const selected = updatedSeats.filter(s => s.isSelected).map(s => s.id);
    onSeatSelect(selected);
    localStorage.setItem(`seats_${movieId}`, JSON.stringify(updatedSeats));
  };

  return (
    <div className={styles.hallContainer}>
      <div className={styles.screen}>ЕКРАН</div>
      <div className={styles.grid}>
        {seats.map(seat => (
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
    </div>
  );
};

CinemaHall.propTypes = {
  movieId: PropTypes.string.isRequired,
  onSeatSelect: PropTypes.func.isRequired
};

export default CinemaHall;