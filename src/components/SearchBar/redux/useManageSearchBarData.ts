import React, { useEffect } from 'react';
import { SearchBarProps } from 'components/SearchBar/SearchBar';

// Redux related imports.
import { useAppDispatch, useAppSelector } from 'app/redux/hooks';
import { searchSelector } from 'components/SearchBar/redux/searchBarSelectors';
import { searchActions } from './searchSlice';
import { useTranslation } from 'react-i18next';

export const useManageSearchBarData = (props: SearchBarProps) => {
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const { searchField } = useAppSelector(searchSelector);
    const placeholderText = t('search.placeholder');
    const searchFieldLabel = t('search.label');
    const searchFieldName = 'searchField';
    const searchParams = new URLSearchParams(window.location.search);

    /*
    Sets the value on load (if provided).
    Need to add a dependency array to run it only once.
    */
    useEffect(() => {
        if (props.searchTerm) {
            dispatch(searchActions.setSearch(props.searchTerm));
        }
    }, [props.searchTerm, dispatch]);

    /**
     * Function invoked on searchbox input change. Updates the state value.
     *
     * @function
     * @param {React.ChangeEvent<HTMLInputElement>} e the event created on input change
     * @returns {Void} nothing
     */
    const handleSearchFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        dispatch(searchActions.setSearch(value));
        searchParams.set('search', value);
        window.history.replaceState({}, '', `${window.location.pathname}?${searchParams}`);
    };
    return { handleSearchFieldChange, searchField, placeholderText, searchFieldLabel, searchFieldName };
};
