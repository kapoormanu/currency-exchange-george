import { render, screen, waitFor } from 'test-utils/testUtils';

import { server } from 'mocks/mockServer';
import { currencyHandlerException } from 'mocks/handlers';

import CurrenciesList from 'components/Currency/CurrenciesList';

describe('<CurrenciesList/> with error in API', () => {
    it('should show an error message if API call failed', async () => {
        server.use(currencyHandlerException);
        render(<CurrenciesList />);
        await waitFor(() => {
            expect(screen.queryByText('Loading Currencies...')).not.toBeInTheDocument();
        });
        // TODO: Improve this test
        const alert = screen.getByRole('alert');
        expect(alert).toBeInTheDocument();
        expect(alert).toHaveTextContent(/Oops\. There was an Error fetching currencies\.*/);
    });
});
