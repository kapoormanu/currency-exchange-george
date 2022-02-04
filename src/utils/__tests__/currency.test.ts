import utils from 'utils/currency';

describe('getFormattedExchangeRate()', () => {
    it('should return the correct formatted exchange rate including trailing zeroes', () => {
        const testData = { baseCurrency: 'EUR', exchangeRate: '1.0' };
        const formattedExchangeRate = utils.getFormattedExchangeRate(testData.exchangeRate, testData.baseCurrency);
        expect(formattedExchangeRate).toBe('1.0 EUR');
    });

    it('should return the formatted rate including trailing decimals, or at least explicit precision', () => {
        const testData = { baseCurrency: 'EUR', exchangeRate: '1.0', precision: 2 };
        const formattedExchangeRate = utils.getFormattedExchangeRate(
            testData.exchangeRate,
            testData.baseCurrency,
            testData.precision
        );
        expect(formattedExchangeRate).toBe('1.00 EUR');
    });

    it('should return placeholder exchange rate if no exchange rate provided', () => {
        const testData = { baseCurrency: 'EUR', exchangeRate: '', precision: 2 };
        const formattedExchangeRate = utils.getFormattedExchangeRate(testData.exchangeRate, testData.baseCurrency);
        expect(formattedExchangeRate).toBe('-- EUR');
    });
});

describe('getCountryFromCurrency()', () => {
    it('should return the 2 letter country code', () => {
        expect(utils.getCountryFromCurrency('INR')).toBe('in');
    });
});
