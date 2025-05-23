// src/components/CinemaHall.jsx
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './CinemaHall.module.css';

const CinemaHall = ({ selectedSeats, setSelectedSeats }) => {
  const [seats, setSeats] = useState([]);
  const rows = 8;
  const cols = 10;

  useEffect(() => {
    const savedSeats = JSON.parse(localStorage.getItem('cinemaSeats') || '[]');
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
  }, []);

  const handleSeatClick = (seatId) => {
    if (seats[seatId - 1].isBooked) return;

    const updatedSeats = seats.map(seat => 
      seat.id === seatId ? { ...seat, isSelected: !seat.isSelected } : seat
    );
    
    setSeats(updatedSeats);
    const newSelected = updatedSeats.filter(s => s.isSelected).map(s => s.id);
    setSelectedSeats(newSelected);
    localStorage.setItem('cinemaSeats', JSON.stringify(updatedSeats));
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
  selectedSeats: PropTypes.array.isRequired,
  setSelectedSeats: PropTypes.func.isRequired
};

export default CinemaHall;