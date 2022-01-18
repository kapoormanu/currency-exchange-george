import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SearchBar from './SearchBar';

describe('<SearchBar />', () => {
    it('has a search box', () => {
        render(<SearchBar />);
        expect(screen.getByRole('searchbox')).toBeInTheDocument();
    });

    it('has no text in the search box on initialization', () => {
        render(<SearchBar />);
        expect(screen.getByRole('searchbox')).toHaveValue('');
    });

    it('populates search box when text typed by the user', () => {
        render(<SearchBar />);
        const searchBox = screen.getByRole('searchbox');
        userEvent.type(searchBox, 'test');
        expect(screen.getByRole('searchbox')).toHaveValue('test');
    });
});
