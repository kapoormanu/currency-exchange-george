import { render, screen, within } from 'test-utils/testUtils';
import userEvent from '@testing-library/user-event';

import App from 'app/App';

/**
 * @function setupApp
 * @private
 *
 * Reusable helper function to render the component and optionally
 * perform functions common to the tests using it
 */
function setupApp() {
    render(<App />);
}
describe('<App />', () => {
    it('renders app', () => {
        setupApp();
    });
    it('renders the Header successfully', async () => {
        setupApp();
        const heading = await screen.findByRole('heading');
        expect(heading).toBeInTheDocument();
    });
    it('renders the searchbar successfully', async () => {
        setupApp();
        const searchbox = await screen.findByRole('searchbox');
        expect(searchbox).toBeInTheDocument();
    });

    it('renders the currencylist successfully', async () => {
        setupApp();
        const currencyList = await screen.findByRole('table', { name: 'Currency List' });
        expect(currencyList).toBeInTheDocument();
    });

    it('should show only results matching the search item', async () => {
        const searchTerm = 'me';
        let unmatchedItem: HTMLElement | null;
        let matchedItem: HTMLElement | null;
        setupApp();
        const currencyList = await screen.findByRole('table', { name: 'Currency List' });
        const searchBox = screen.getByRole('searchbox');
        expect(searchBox).toHaveValue('');
        userEvent.type(searchBox, searchTerm);
        unmatchedItem = within(currencyList).queryByRole('cell', { name: 'FJD' });
        expect(unmatchedItem).not.toBeInTheDocument();
        matchedItem = within(currencyList).queryByRole('img', { name: 'Mexican Peso' });
        expect(matchedItem).toBeInTheDocument();
    });

    it('should revert to show all currencies on clearing the search input', async () => {
        const searchTerm = 'me';
        let matchedItem: HTMLElement | null;
        setupApp();
        const currencyList = await screen.findByRole('table', { name: 'Currency List' });
        const searchBox = screen.getByRole('searchbox');

        userEvent.clear(searchBox);
        userEvent.type(searchBox, searchTerm);
        expect(searchBox).toHaveValue(searchTerm);
        matchedItem = within(currencyList).queryByRole('cell', { name: 'FJD' });
        expect(matchedItem).not.toBeInTheDocument();
        userEvent.clear(searchBox);
        matchedItem = within(currencyList).getByRole('cell', { name: 'FJD' });
        expect(matchedItem).toBeInTheDocument();
    });
});
