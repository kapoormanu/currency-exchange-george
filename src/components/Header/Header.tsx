import React from 'react';
import styles from './Header.module.css';

/**
 * The Header component used to show the website header using the <header> tag.
 *
 * @returns {JSX.Element} a JSX element composing the header
 * @example
 *  <Header />
 */
function Header() {
    return (
        <header className={styles.header}>
            <h1 className={styles.headerTitle}>George FE Test</h1>
        </header>
    );
}

export default Header;
