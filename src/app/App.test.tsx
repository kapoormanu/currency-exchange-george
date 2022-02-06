import { render, screen } from 'test-utils/testUtils';

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
});
