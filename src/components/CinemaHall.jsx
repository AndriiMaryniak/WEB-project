import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './CinemaHall.module.css';

const safeParse = (key, defaultValue) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
};

const CinemaHall = ({ movieId, onSeatSelect }) => {
  const [seats, setSeats] = useState([]);
  const rows = 8;
  const cols = 10;

  useEffect(() => {
    const bookings = safeParse('bookings', []);
    const occupiedSeats = bookings
      .filter(b => b.movieId === movieId)
      .flatMap(b => b.seats);

    const savedSeats = safeParse(`seats_${movieId}`, []);
    
    const initialSeats = Array.from({ length: rows * cols }, (_, i) => {
      const seatId = i + 1;
      const savedSeat = savedSeats.find(s => s.id === seatId);
      return {
        id: seatId,
        isBooked: occupiedSeats.includes(seatId),
        isSelected: savedSeat?.isSelected || false
      };
    });

    setSeats(initialSeats);
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

  const groupedSeats = [];
  for (let i = 0; i < rows; i++) {
    groupedSeats.push(seats.slice(i * cols, (i + 1) * cols));
  }

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