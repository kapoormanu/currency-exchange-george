import { render, screen, waitFor, within } from 'test-utils/testUtils';

import fxData from 'mocks/data/fx.json';

import CurrenciesList from 'components/Currency/CurrenciesList';

/**
 * @function renderCurrencyList
 * @memberof CurrenciesList.test
 *
 * Reusable helper function to render the component and optionally
 * perform functions common to the tests using it.
 * Renders the CurrenciesList component and returns a promise to wait for
 * currencies to be loaded.
 * @param {string} currency Currency symbol
 *
 * @returns {Object} returns `utils` returned from render, `baseCurrency` and `currencyData` used
 */
const renderCurrencyList = async () => {
    const utils = render(<CurrenciesList />);
    await waitFor(() => {
        const LOADING_CURRENCIES_TEXT = 'Loading Currencies...';
        // hide message when SUCCESS/api failure
        expect(screen.queryByText(LOADING_CURRENCIES_TEXT)).not.toBeInTheDocument();
    });
    return utils;
};

describe('<CurrenciesList/>', () => {
    it('should load all the countries from API', async () => {
        await renderCurrencyList();
        const currencyList = screen.getByRole('table', { name: 'Currency List' });

        expect(within(currencyList).getAllByRole('row')).toHaveLength(fxData.fx.length + 2); // plus one each for the header/footer
    });

    it('should load flags for all countries including placeholders for missing flags', async () => {
        await renderCurrencyList();

        // Assumption: no other images are rendered inside CurrenciesList
        expect(screen.getAllByRole('img')).toHaveLength(fxData.fx.length);
    });

    it('should have a placeholder name for all currencies without a name', async () => {
        const CURRENCY_NOT_AVAILABLE_TEXT = 'N/A';
        await renderCurrencyList();

        const currenciesWithoutName = fxData.fx.filter((currency) => !currency.nameI18N);

        expect(screen.getAllByText(CURRENCY_NOT_AVAILABLE_TEXT)).toHaveLength(currenciesWithoutName.length);
    });

    it('should have a placeholder exchange rate for all empty buy and sell values', async () => {
        await renderCurrencyList();
        const totalEmptyValues = fxData.fx.reduce((total, currency) => {
            if (!currency.exchangeRate?.buy) {
                total++;
            }
            if (!currency.exchangeRate?.sell) {
                total++;
            }
            return total;
        }, 0);
        const PLACEHOLDER_EXCHANGE_RATE = '-- EUR';
        expect(screen.getAllByText(PLACEHOLDER_EXCHANGE_RATE).length).toBe(totalEmptyValues);
    });
});
