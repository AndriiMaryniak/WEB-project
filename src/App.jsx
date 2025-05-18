import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';
import Loader from './components/Loader';
import './index.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTime, setSelectedTime] = useState(() => {
    return localStorage.getItem('selectedTime') || '';
  });

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
          <h1 className="mainTitle">CineMagic</h1>
          <p className="subtitle">Оберіть фільм та час сеансу</p>
        </header>
        
        <Routes>
          <Route path="/" element={
            loading ? <Loader /> : 
            <MovieList 
              movies={movies} 
              selectedTime={selectedTime}
              setSelectedTime={setSelectedTime}
            />
          }/>
          <Route path="/movie/:id" element={<MovieDetails movies={movies} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;