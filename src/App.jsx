import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieList from './components/MovieList';
import Loader from './components/Loader';
import './index.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

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
    <div className="App">
      <header className="header">
        <h1 className="mainTitle">CineMagic</h1>
        <p className="subtitle">Оберіть фільм та час сеансу</p>
      </header>
      
      {loading ? <Loader /> : <MovieList movies={movies} loading={loading} />}
    </div>
  );
}

export default App;