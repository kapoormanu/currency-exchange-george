import { render, screen } from 'test-utils/testUtils';
import userEvent from '@testing-library/user-event';

import SearchBar, { SearchBarProps } from 'components/SearchBar/SearchBar';

/**
 * @function renderCompleteCurrencyItem
 * @memberof SearchBar.test
 *
 * Reusable helper function to render the component and optionally
 * perform functions common to the tests using it.
 * Renders the SearchBar component and the element refering to the searchbox..
 * @param {SearchBarProps} props props to send to the component
 *
 * @returns {Object} returns `utils` returned from render and a ref to the rendered searchbox.
 */
function setupSearchBar(props: SearchBarProps = {}) {
    const utils = render(<SearchBar {...props} />);
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

    xit('has same text as in the query param for search on initialization', () => {
        // Todo
    });

    xit('updates the text in the query param for search when user types text', () => {
        // Todo
    });
});
