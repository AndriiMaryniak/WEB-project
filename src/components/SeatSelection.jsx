import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './SeatSelection.module.css';

const SeatSelection = () => {
  const { movieId, showtime } = useParams();
  const navigate = useNavigate();
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [movie, setMovie] = useState(null);

  // Генерація місць
  const generateSeats = () => {
    const rows = ['A', 'B', 'C', 'D', 'E', 'F'];
    return rows.flatMap((row) => 
      Array.from({ length: 8 }, (_, index) => ({
        id: `${row}${index + 1}`,
        row: row,
        number: index + 1,
        isAvailable: Math.random() > 0.3
      }))
    );
  };

  // Завантаження стану місць
  useEffect(() => {
    const savedSeats = localStorage.getItem(`seats-${movieId}-${showtime}`);
    const initialSeats = savedSeats ? JSON.parse(savedSeats) : generateSeats();
    setSeats(initialSeats);

    const fetchMovie = async () => {
      const response = await axios.get(`http://localhost:3001/movies/${movieId}`);
      setMovie(response.data);
    };
    fetchMovie();
  }, [movieId, showtime]);

  // Обробник вибору місця
  const handleSeatClick = (seatId) => {
    const updatedSeats = seats.map(seat => 
      seat.id === seatId ? { ...seat, isSelected: !seat.isSelected } : seat
    );
    setSeats(updatedSeats);
    setSelectedSeats(prev => 
      prev.includes(seatId) 
        ? prev.filter(id => id !== seatId) 
        : [...prev, seatId]
    );
  };

  // Підтвердження бронювання
  const handleBooking = () => {
    const bookingData = {
      movieId,
      showtime,
      seats: selectedSeats,
      date: new Date().toLocaleString()
    };

    // Зберігання в localStorage
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    localStorage.setItem('bookings', JSON.stringify([...bookings, bookingData]));
    
    // Оновлення статусу місць
    const updatedSeats = seats.map(seat => 
      selectedSeats.includes(seat.id) ? { ...seat, isAvailable: false } : seat
    );
    localStorage.setItem(`seats-${movieId}-${showtime}`, JSON.stringify(updatedSeats));
    
    navigate(`/booking-confirmation/${movieId}/${showtime}`);
  };

  if (!movie) return <div className={styles.loading}>Завантаження...</div>;

  return (
    <div className={styles.container}>
      <h1>{movie.title} - {showtime}</h1>
      <div className={styles.screen}>🎬 ЕКРАН</div>

      <div className={styles.seatMap}>
        {[...new Set(seats.map(seat => seat.row))].map(row => (
          <div key={row} className={styles.row}>
            <span className={styles.rowLabel}>Ряд {row}</span>
            <div className={styles.seats}>
              {seats.filter(seat => seat.row === row).map(seat => (
                <button
                  key={seat.id}
                  className={`${styles.seat} ${
                    !seat.isAvailable ? styles.taken :
                    seat.isSelected ? styles.selected : ''
                  }`}
                  onClick={() => handleSeatClick(seat.id)}
                  disabled={!seat.isAvailable}
                >
                  {seat.number}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <div className={`${styles.seat} ${styles.available}`}></div>
          <span>Вільні</span>
        </div>
        <div className={styles.legendItem}>
          <div className={`${styles.seat} ${styles.selected}`}></div>
          <span>Обрані</span>
        </div>
        <div className={styles.legendItem}>
          <div className={`${styles.seat} ${styles.taken}`}></div>
          <span>Зайняті</span>
        </div>
      </div>

      <div className={styles.actions}>
        <Link to={`/movie/${movieId}`} className={styles.backButton}>
          ← Назад
        </Link>
        <button
          className={styles.bookButton}
          onClick={handleBooking}
          disabled={selectedSeats.length === 0}
        >
          Забронювати ({selectedSeats.length})
        </button>
      </div>
    </div>
  );
};

export default SeatSelection;