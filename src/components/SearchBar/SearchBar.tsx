import React from 'react';
import styles from './SearchBar.module.css';

export type SearchBarProps = {
    searchTerm?: string;
};

/**
 * SearchBar Component. Includes a searchbox with an associated label.
 * Accepts value from props to populate the searchbox or initializes it with ''.
 *
 * @component
 * @param {SearchBarProps} props the props passed to the component
 * @property {string} props.searchTerm (Optional) value to set in searchbox
 * @returns {JSX.Element} a JSX element composing the SearchBar
 */
function SearchBar(props: SearchBarProps) {
    const [searchField, setSearchField] = React.useState(props.searchTerm || '');

    /**
     * Function invoked on searchbox input change. Updates the state value.
     *
     * @function
     * @private
     * @param {React.ChangeEvent<HTMLInputElement>} e the event created on input change
     * @returns {Void} nothing
     */
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
