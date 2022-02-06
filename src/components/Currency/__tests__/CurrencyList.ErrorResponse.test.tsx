import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';

import { server } from 'mocks/mockServer';
import { currencyHandlerException } from 'mocks/handlers';

import { store } from 'app/store';
import CurrencyList from 'components/Currency/CurrencyList';

describe('<CurrencyList/> with error in API', () => {
    it('should show an error message if API call failed', async () => {
        server.use(currencyHandlerException);
        render(
            <Provider store={store}>
                <CurrencyList />
            </Provider>
        );
        await waitFor(() => {
            expect(screen.queryByText('Loading Currencies...')).not.toBeInTheDocument();
        });
        // TODO: Improve this test
        const alert = screen.getByRole('alert');
        expect(alert).toBeInTheDocument();
        expect(alert).toHaveTextContent(/Oops\. There was an Error fetching currencies\.*/);
    });
});
