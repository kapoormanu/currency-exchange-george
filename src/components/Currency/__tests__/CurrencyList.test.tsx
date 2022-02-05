import React from 'react';

import { render, screen, waitFor } from '@testing-library/react';
import CurrencyList from 'components/Currency/CurrencyList';
import fxData from 'mocks/data/fx.json';

describe('<CurrencyList/>', () => {
    it('should load all the countries from API', async () => {
        render(<CurrencyList />);

        // Show loading currencies while fetching from API
        expect(await screen.findByText('Loading Currencies...')).toBeInTheDocument();
        await waitFor(() => {
            // and then hide it when loaded
            expect(screen.queryByText('Loading Currencies...')).not.toBeInTheDocument();
        });
        expect(screen.getAllByRole('row')).toHaveLength(fxData.fx.length);
    });

    it('should load flags for all countries including placeholders for missing flags', async () => {
        render(<CurrencyList />);

        // Show loading currencies while fetching from API
        expect(await screen.findByText('Loading Currencies...')).toBeInTheDocument();
        await waitFor(() => {
            // and then hide it when loaded
            expect(screen.queryByText('Loading Currencies...')).not.toBeInTheDocument();
        });

        // Assumption: no other images are rendered inside CurrencyList
        expect(screen.getAllByRole('img')).toHaveLength(fxData.fx.length);
    });
});
