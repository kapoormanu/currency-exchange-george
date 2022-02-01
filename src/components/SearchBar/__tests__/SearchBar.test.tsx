import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Provider } from 'react-redux';
import { store } from 'app/store';

import SearchBar, { SearchBarProps } from 'components/SearchBar/SearchBar';

function setupSearchBar(props: SearchBarProps = {}) {
    const utils = render(
        <Provider store={store}>
            <SearchBar {...props} />
        </Provider>
    );
    const searchBox = screen.getByRole('searchbox', { name: 'search.label' });
    return {
        ...utils,
        searchBox
    };
}

describe('<SearchBar />', () => {
    it('has a search box with no text on initialization', () => {
        const { searchBox } = setupSearchBar();
        expect(searchBox).toHaveValue('');
    });

    it('has a search box with placeholder', () => {
        setupSearchBar();
        expect(screen.getByPlaceholderText('search.placeholder')).toBeInTheDocument();
    });

    it('populates search box when text typed by the user', () => {
        const { searchBox } = setupSearchBar();
        expect(searchBox).toHaveValue('');
        userEvent.type(searchBox, 'test');
        expect(searchBox).toHaveValue('test');
    });

    it('populates search box with value supplied in props', () => {
        const testProps = {
            searchTerm: 'USD'
        };
        const { searchBox } = setupSearchBar(testProps);
        expect(searchBox).toHaveValue(testProps.searchTerm);
    });
});
