import React from 'react';
import ReactDOMServer from 'react-dom/server';

import { Trans } from 'react-i18next';
import styles from 'components/SearchBar/SearchBar.module.css';
import { useManageSearchBarData } from 'components/SearchBar/redux/useManageSearchBarData';

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
    /* eslint-disable-next-line testing-library/render-result-naming-convention */
    const placeholderText = ReactDOMServer.renderToString(<Trans>search.placeholder</Trans>);
    const { handleSearchFieldChange, searchField } = useManageSearchBarData(props);

    return (
        <div className={styles.searchBar}>
            <label htmlFor='searchField'>
                <Trans>search.label</Trans>
            </label>
            <input
                type='search'
                name='searchField'
                id='searchField'
                value={searchField}
                placeholder={placeholderText}
                onChange={handleSearchFieldChange}
            />
        </div>
    );
}

export default SearchBar;
