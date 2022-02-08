import { render, screen, waitFor, within } from 'test-utils/testUtils';
import userEvent from '@testing-library/user-event';

import App from 'app/App';

/**
 * @function setupApp
 * @private
 *
 * Reusable helper function to render the component and optionally
 * perform functions common to the tests using it
 */
async function setupApp() {
    render(<App />);
    await waitFor(() => {
        const LOADING_CURRENCIES_TEXT = 'Loading Currencies...';
        // hide message when SUCCESS/api failure
        expect(screen.queryByText(LOADING_CURRENCIES_TEXT)).not.toBeInTheDocument();
    });
}

describe('CurrencyList filtering using SearchBar', () => {
    it('should show only results matching the search item', async () => {
        const searchTerm = 'me';
        await setupApp();
        const currencyList = await screen.findByRole('table', { name: 'Currency List' });
        const searchBox = screen.getByRole('searchbox');

        // Type the searchterm to filter results
        userEvent.type(searchBox, searchTerm);

        // Check that only expected items are present due to filter term
        const matchedItem: HTMLElement | null = within(currencyList).queryByRole('img', { name: 'Mexican Peso' });
        const unmatchedItem: HTMLElement | null = within(currencyList).queryByRole('cell', { name: 'FJD' });
        expect(unmatchedItem).not.toBeInTheDocument();
        expect(matchedItem).toBeInTheDocument();
    });

    it('should revert to show all currencies on clearing the search input', async () => {
        const searchTerm = 'me';
        setupApp();
        const currencyList = await screen.findByRole('table', { name: 'Currency List' });
        const searchBox = screen.getByRole('searchbox');
        userEvent.clear(searchBox);
        // populate with search term
        userEvent.type(searchBox, searchTerm);

        // Check that non-matching element should not be there
        const unmatchedItem = within(currencyList).queryByRole('cell', { name: 'FJD' });
        expect(unmatchedItem).not.toBeInTheDocument();

        // Clear searchbox and then check the previously missing item should now be present
        userEvent.clear(searchBox);
        const matchedItem = within(currencyList).getByRole('cell', { name: 'FJD' });
        expect(matchedItem).toBeInTheDocument();
    });
});
