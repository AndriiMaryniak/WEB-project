import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';
import SeatSelection from './components/SeatSelection';
import BookingConfirmation from './components/BookingConfirmation';
import Loader from './components/Loader';
import './index.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [selectedTime, setSelectedTime] = useState('all');

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://localhost:3001/movies');
        setMovies(response.data);
      } catch (error) {
        console.error('Помилка завантаження фільмів:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  return (
    <Router>
      <div className="App">
        <header className="header">
          <h1 className="mainTitle">Cinema no Takizawa</h1>
          <p className="subtitle">Оберіть фільм та час сеансу</p>
        </header>
        
        <Routes>
          <Route path="/" element={
            loading ? <Loader /> :
            <MovieList
              movies={movies}
              selectedGenre={selectedGenre}
              setSelectedGenre={setSelectedGenre}
              selectedTime={selectedTime}
              setSelectedTime={setSelectedTime}
            />
          }/>
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/book/:movieId/:showtime" element={<SeatSelection />} />
          <Route path="/booking-confirmation/:movieId/:showtime" element={<BookingConfirmation />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;