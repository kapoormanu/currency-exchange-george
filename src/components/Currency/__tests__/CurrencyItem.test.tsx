import React from 'react';

import CurrencyItem from 'components/Currency/CurrencyItem';
import { render, screen } from '@testing-library/react';
import fxData from 'mocks/data/fx.json';
import utils from 'utils/currency';
import { Currency } from 'types/currency';

function renderCompleteCurrencyItem(customCurrencyCode?: string) {
    const baseCurrency = 'EUR';
    const testCurrencyData: Currency = {
        currency: customCurrencyCode || 'FJD',
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

    it('should show output the currency code', async () => {
        const { currencyData } = renderCompleteCurrencyItem();
        expect(screen.getByText(`${currencyData.currency}`)).toBeInTheDocument();
    });

    it('should show output the country flag for currency', async () => {
        const country = 'in';
        jest.spyOn(utils, 'getCountryFromCurrency').mockReturnValue(country);
        const { currencyData } = renderCompleteCurrencyItem();
        const countryFlagImage: HTMLImageElement = screen.getByRole('img', { name: `${currencyData.nameI18N}` });
        expect(countryFlagImage).toBeInTheDocument();
        // eslint-disable-next-line no-restricted-globals
        expect(countryFlagImage.src).toBe(`${location.origin}/${country}.png`);
    });

    it("should show output the currency's exchange price in base currency", async () => {
        const { currencyData, baseCurrency } = renderCompleteCurrencyItem();
        expect(screen.getByText(`${currencyData.exchangeRate?.buy} ${baseCurrency}`)).toBeInTheDocument();
    });

    it('should have a placeholder name for currencies without a name', () => {
        renderSymbolOnlyCurrencyItem();
        expect(screen.getByText('N/A')).toBeInTheDocument();
    });

    it('should have a placeholder rate for currencies without an exchange rate', () => {
        const { baseCurrency } = renderSymbolOnlyCurrencyItem();
        expect(screen.getByText(`-- ${baseCurrency}`)).toBeInTheDocument();
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
