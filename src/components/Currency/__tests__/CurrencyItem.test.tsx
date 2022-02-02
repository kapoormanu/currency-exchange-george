import React from 'react';

import CurrencyItem from 'components/Currency/CurrencyItem';
import { render, screen } from '@testing-library/react';
import fxData from 'mocks/data/fx.json';
import utils from 'utils/currency';

function renderCurrencyItemWithFirstCurrency() {
    const currencyData = fxData.fx[0];
    const utils = render(<CurrencyItem currencyData={currencyData} />);
    return {
        ...utils,
        currencyData
    };
}

function renderSymbolOnlyCurrencyItem() {
    const currencyData = fxData.fx.find(
        (currency) => !(currency.nameI18N || currency.exchangeRate || currency.exchangeRate)
    );
    const utils = render(<CurrencyItem currencyData={currencyData} />);
    return {
        ...utils,
        currencyData
    };
}

describe('<CurrencyItem/>', () => {
    it('should show output the currency name', async () => {
        const { currencyData } = renderCurrencyItemWithFirstCurrency();
        expect(screen.getByText(`${currencyData.nameI18N}`)).toBeInTheDocument();
    });

    it('should show output the currency code', async () => {
        const { currencyData } = renderCurrencyItemWithFirstCurrency();
        expect(screen.getByText(`${currencyData.currency}`)).toBeInTheDocument();
    });

    it('should show output the country flag for currency', async () => {
        const country = 'in';
        jest.spyOn(utils, 'getCountryFromCurrency').mockReturnValue(country);
        renderCurrencyItemWithFirstCurrency();
        const countryFlagImage: HTMLImageElement = screen.getByRole('img', { name: `${country}` });
        expect(countryFlagImage).toBeInTheDocument();
        expect(countryFlagImage.src).toBe(`${country}.png`);
    });

    it("should show output the currency's exchange price in base currency", async () => {
        jest.spyOn(utils, 'getFormattedExchangeRate').mockReturnValue('2 EUR');
        renderCurrencyItemWithFirstCurrency();
        expect(screen.getByText('2 EUR')).toBeInTheDocument();
    });

    it('should have a placeholder for currencies without a name', () => {
        renderSymbolOnlyCurrencyItem();
        expect(screen.getByText(' - ')).toBeInTheDocument();
    });
});
