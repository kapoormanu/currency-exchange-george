import React from 'react';
import styles from './SearchBar.module.css';

function SearchBar() {
    const [searchField, setSearchField] = React.useState('');

    const handleSearchFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setSearchField(value);
    };

    return (
        <div className={styles.searchBar}>
            <label htmlFor='searchField'>Search:</label>
            <input
                type='search'
                name='searchField'
                id='searchField'
                value={searchField}
                placeholder='Enter symbol(eg EUR)'
                onChange={handleSearchFieldChange}
            />
        </div>
    );
}

export default SearchBar;
