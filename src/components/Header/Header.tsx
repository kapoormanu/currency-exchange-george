import React from 'react';
import styles from './Header.module.css';

function Header() {
    return (
        <header className={styles.header}>
            <h1 className={styles.headerTitle}>George FE Test</h1>
        </header>
    );
}

export default Header;