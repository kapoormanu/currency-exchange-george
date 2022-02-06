import React from 'react';

import CurrencyItem from 'components/Currency/CurrencyItem';
import { render, screen } from '@testing-library/react';
import fxData from 'mocks/data/fx.json';
import utils from 'utils/currency';
import { Currency } from 'types/currency';

/**
 * @function renderCompleteCurrencyItem
 * @memberof CurrencyItem.test
 *
 * Reusable helper function to render the component and optionally
 * perform functions common to the tests using it.
 * Renders the CurrencyItem component using a sample currency item.
 * @param {string} currency Currency symbol
 *
 * @returns {Object} returns `utils` returned from render, `baseCurrency` and `currencyData` used
 */
function renderCompleteCurrencyItem() {
    const baseCurrency = 'EUR';
    const testCurrencyData: Currency = {
        currency: 'FJD',
        nameI18N: 'Fiji Dollar',
        exchangeRate: {
            buy: '2.0',
            sell: '2.5'
        },
        flags: ['provided']
    };
    const utils = render(<CurrencyItem currencyData={testCurrencyData} baseCurrency={baseCurrency} />);
    return {
        ...utils,
        currencyData: testCurrencyData,
        baseCurrency
    };
}

function renderSymbolOnlyCurrencyItem() {
    const baseCurrency = 'EUR';
    const currencyData = fxData.fx.find(
        (currency) => !(currency.nameI18N || currency.exchangeRate || currency.exchangeRate)
    ) as Currency;
    const utils = render(<CurrencyItem currencyData={currencyData} baseCurrency={baseCurrency} />);

    return {
        ...utils,
        currencyData,
        baseCurrency
    };
}

describe('<CurrencyItem/>', () => {
    it('should output the currency name', async () => {
        const { currencyData } = renderCompleteCurrencyItem();
        expect(screen.getByText(`${currencyData.nameI18N}`)).toBeInTheDocument();
    });

    it('should output the currency code', async () => {
        const { currencyData } = renderCompleteCurrencyItem();
        expect(screen.getByText(`${currencyData.currency}`)).toBeInTheDocument();
    });

    it('should output the country flag for currency', async () => {
        const country = 'in';
        jest.spyOn(utils, 'getCountryFromCurrency').mockReturnValue(country);
        const { currencyData } = renderCompleteCurrencyItem();
        const countryFlagImage: HTMLImageElement = screen.getByRole('img', { name: `${currencyData.nameI18N}` });
        expect(countryFlagImage).toBeInTheDocument();
        // eslint-disable-next-line no-restricted-globals
        expect(countryFlagImage.src).toBe(`${location.origin}/${country}.png`);
    });

    it("should output the currency's buy price in base currency correctly", async () => {
        const { baseCurrency } = renderCompleteCurrencyItem();
        // exchange rate is provided since this is calculated by a util function
        // This test will fail only if the underlying utility function fails
        expect(screen.getByText(`0.5 ${baseCurrency}`)).toBeInTheDocument();
    });

    it("should output the currency's sell price in base currency correctly", async () => {
        const { baseCurrency } = renderCompleteCurrencyItem();
        // exchange rate is provided since this is calculated by a util function
        // This test will fail only if the underlying utility function fails
        expect(screen.getByText(`0.4 ${baseCurrency}`)).toBeInTheDocument();
    });

    it('should have a placeholder name for currencies without a name', () => {
        renderSymbolOnlyCurrencyItem();
        expect(screen.getByText('N/A')).toBeInTheDocument();
    });

    it('should have a placeholder buy and sell rate for currencies without an exchange rate', () => {
        const { baseCurrency } = renderSymbolOnlyCurrencyItem();
        const cellsWithExchangeRate = screen.getAllByRole('cell', { name: `-- ${baseCurrency}` });
        expect(cellsWithExchangeRate).toHaveLength(2); // one for buy, one for sell
    });

    it('should have a placeholder flag for currencies without matching file', () => {
        const country = 'zz';
        jest.spyOn(utils, 'getCountryFromCurrency').mockReturnValue(country);
        const { currencyData } = renderCompleteCurrencyItem();
        const countryFlagImage: HTMLImageElement = screen.getByRole('img', { name: `${currencyData.nameI18N}` });
        expect(countryFlagImage).toBeInTheDocument();
        expect(countryFlagImage.src).toBe('https://via.placeholder.com/70x47/83ddff/2f2f2f?text=No+Flag');
    });
});
