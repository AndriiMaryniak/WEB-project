import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';

const NotFound = () => {
  return (
    <div className={styles.container}>
      <h1>404 - Сторінку не знайдено</h1>
      <p>Запитана сторінка не існує або була видалена</p>
      <Link to="/" className={styles.homeLink}>На головну</Link>
    </div>
  );
};

export default NotFound;