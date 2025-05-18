import React from 'react';
import MovieList from './components/MovieList';
import { movies } from './data/movies';
import './index.css';

function App() {
  return (
    <div className="App">
      <header className="header">
        <h1 className="mainTitle">CineMagic</h1>
        <p className="subtitle">Оберіть фільм та час сеансу</p>
      </header>
      <MovieList movies={movies} />
    </div>
  );
}

export default App;