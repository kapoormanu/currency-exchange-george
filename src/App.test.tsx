import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('<App />', () => {
    it('renders app', () => {
        render(<App />);
    });
    it('renders the Header successfully', () => {
        render(<App />);
        expect(screen.getByRole('heading')).toBeInTheDocument();
    });
    it('renders the searchbar successfully', () => {
        render(<App />);
        expect(screen.getByRole('searchbox')).toBeInTheDocument();
    });
});
