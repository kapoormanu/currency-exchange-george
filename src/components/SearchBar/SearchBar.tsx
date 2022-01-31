import React, { useEffect } from 'react';
import ReactDOMServer from 'react-dom/server';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { searchActions } from './searchSlice';

import { Trans } from 'react-i18next';

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
    const dispatch = useAppDispatch();
    const { searchField } = useAppSelector((state) => state.search);

    useEffect(() => {
        if (props.searchTerm) {
            dispatch(searchActions.setSearch(props.searchTerm));
        }
    }, [props.searchTerm, dispatch]);

    /* eslint-disable-next-line testing-library/render-result-naming-convention */
    const placeholderText = ReactDOMServer.renderToString(<Trans>search.placeholder</Trans>);

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
        dispatch(searchActions.setSearch(value));
    };

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
