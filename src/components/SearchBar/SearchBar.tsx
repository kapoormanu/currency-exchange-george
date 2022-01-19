import React from 'react';
import styles from './SearchBar.module.css';

export type SearchBarProps = {
    searchTerm?: string;
};

function SearchBar(props: SearchBarProps) {
    const [searchField, setSearchField] = React.useState(props.searchTerm || '');

    const handleSearchFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setSearchField(value);
    };

    return (
        <div className={styles.searchBar}>
            <label htmlFor='searchField'>Search</label>
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
