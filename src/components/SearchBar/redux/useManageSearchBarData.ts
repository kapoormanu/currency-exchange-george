import React, { useEffect } from 'react';
import { SearchBarProps } from 'components/SearchBar/SearchBar';

// Redux related imports.
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { searchSelector } from 'components/SearchBar/redux/searchBarSelectors';
import { searchActions } from './searchSlice';

export const useManageSearchBarData = (props: SearchBarProps) => {
    const dispatch = useAppDispatch();
    const { searchField } = useAppSelector(searchSelector);

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
    };
    return { handleSearchFieldChange, searchField };
};
