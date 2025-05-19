import React from 'react';
import { ImSpinner8 } from 'react-icons/im'; // Виправлений імпорт
import styles from './Loader.module.css';
const Loader = () => {
return (
<div className={styles.container}>
<ImSpinner8 className={styles.spinner} />
<p>Завантаження фільмів...</p>
</div>
);
};
export default Loader;