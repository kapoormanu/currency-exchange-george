import { render, screen, waitFor } from 'test-utils/testUtils';

import { server } from 'mocks/mockServer';
import { currencyHandlerEmpty } from 'mocks/handlers';

import CurrenciesList from 'components/Currency/CurrenciesList';

describe('<CurrenciesList/> with empty data', () => {
    it('should show an appropriate message if API returns 0 currencies', async () => {
        const NO_CURRENCIES_AVAILABLE_TEXT = 'No currencies available.';
        server.use(currencyHandlerEmpty);

        render(<CurrenciesList />);
        await waitFor(() => {
            const LOADING_CURRENCIES_TEXT = 'Loading Currencies...';
            expect(screen.queryByText(LOADING_CURRENCIES_TEXT)).not.toBeInTheDocument();
        });

        const alert = screen.getByRole('alert');

        expect(alert).toBeInTheDocument();
        expect(alert).toHaveTextContent(NO_CURRENCIES_AVAILABLE_TEXT);
    });
});
