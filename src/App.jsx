// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Home from './pages/Home';
import MovieDetails from './components/MovieDetails';
import Booking from './pages/Booking';
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
            <Home
              movies={movies}
              selectedGenre={selectedGenre}
              setSelectedGenre={setSelectedGenre}
              selectedTime={selectedTime}
              setSelectedTime={setSelectedTime}
            />
          }/>
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/booking/:id" element={<Booking />} />
          <Route path="/booking-confirmation" element={<BookingConfirmation />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;