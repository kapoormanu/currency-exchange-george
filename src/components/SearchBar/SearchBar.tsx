import React from 'react';

import styles from 'components/SearchBar/SearchBar.module.css';
import { useManageSearchBarData } from 'components/SearchBar/redux/useManageSearchBarData';
import Input from 'components/UI/Input/Input';

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
    const { handleSearchFieldChange, searchField, searchFieldLabel, placeholderText, searchFieldName } =
        useManageSearchBarData(props);

    return (
        <div className={styles.searchBar}>
            <Input
                type='search'
                name={searchFieldName}
                id={searchFieldName}
                label={searchFieldLabel}
                placeholder={placeholderText}
                onChange={handleSearchFieldChange}
                value={searchField}
            />
        </div>
    );
}

export default SearchBar;
