import React from 'react';
import PropTypes from 'prop-types';
import styles from './MovieCard.module.css';
const MovieCard = ({ movie, selectedTime }) => {
return (
<div className={styles.card}>
<div className={styles.posterWrapper}>
<img
src={movie.poster}
alt={movie.title}
className={styles.poster}
loading="lazy"
/>
</div>
<div className={styles.content}>
<h3 className={styles.title}>{movie.title}</h3>
<div className={styles.showtimes}>
{movie.showtimes.map(time => (
<button
key={time}
className={`${styles.timeButton} ${
selectedTime === time ? styles.selected : ''
}`}
>
{time}
</button>
))}
</div>
</div>
</div>
);
};
MovieCard.propTypes = {
movie: PropTypes.object.isRequired,
selectedTime: PropTypes.string
};
export default MovieCard;