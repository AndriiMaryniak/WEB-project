import React from 'react';
import MovieList from '../components/MovieList';

const Home = ({ movies, selectedGenre, setSelectedGenre, selectedTime, setSelectedTime }) => {
  return (
    <section className="home-page">
      <MovieList
        movies={movies}
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
        selectedTime={selectedTime}
        setSelectedTime={setSelectedTime}
      />
    </section>
  );
};

export default Home;