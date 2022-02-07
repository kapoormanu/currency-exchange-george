import { render, screen, waitFor } from 'test-utils/testUtils';

import { server } from 'mocks/mockServer';
import { currencyHandlerException } from 'mocks/handlers';

import CurrenciesList from 'components/Currency/CurrenciesList';

describe('<CurrenciesList/> with error in API', () => {
    it('should show an error message if API call failed', async () => {
        const ERROR_MESSAGE = /Oops\. There was an Error fetching currencies\.*/;
        server.use(currencyHandlerException);
        render(<CurrenciesList />);
        await waitFor(() => {
            const LOADING_CURRENCIES_TEXT = 'Loading Currencies...';
            expect(screen.queryByText(LOADING_CURRENCIES_TEXT)).not.toBeInTheDocument();
        });

        const alert = screen.getByRole('alert');

        expect(alert).toBeInTheDocument();
        expect(alert).toHaveTextContent(ERROR_MESSAGE);
    });
});
