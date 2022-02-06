import { render, screen, waitFor } from 'test-utils/testUtils';

import { server } from 'mocks/mockServer';
import { currencyHandlerEmpty } from 'mocks/handlers';

import CurrencyList from 'components/Currency/CurrencyList';

describe('<CurrencyList/> with empty data', () => {
    it('should show an appropriate message if API returns 0 currencies', async () => {
        server.use(currencyHandlerEmpty);
        render(<CurrencyList />);
        await waitFor(() => {
            expect(screen.queryByText('Loading Currencies...')).not.toBeInTheDocument();
        });
        // TODO: Improve this test
        const alert = screen.getByRole('alert');
        expect(alert).toBeInTheDocument();
        expect(alert).toHaveTextContent('No currencies available.');
    });
});
