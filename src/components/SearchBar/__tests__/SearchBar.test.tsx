import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SearchBar from '../SearchBar';

function setupSearchBar() {
    const utils = render(<SearchBar />);
    const searchBox = screen.getByRole('searchbox');
    return {
        ...utils,
        searchBox
    };
}

describe('<SearchBar />', () => {
    it('has a search box', () => {
        const { searchBox } = setupSearchBar();
        expect(searchBox).toBeInTheDocument();
    });

    it('has no text in the search box on initialization', () => {
        const { searchBox } = setupSearchBar();
        expect(searchBox).toHaveValue('');
    });

    it('populates search box when text typed by the user', () => {
        const { searchBox } = setupSearchBar();
        expect(searchBox).toHaveValue('');
        userEvent.type(searchBox, 'test');
        expect(searchBox).toHaveValue('test');
    });
});