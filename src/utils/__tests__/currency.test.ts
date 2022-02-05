import utils from 'utils/currency';

describe('getFormattedExchangeRate()', () => {
    it('should return the correct formatted exchange rate including trailing zeroes', () => {
        const testData = { baseCurrency: 'EUR', exchangeRate: '1.0' };
        const formattedExchangeRate = utils.getFormattedExchangeRate(testData.exchangeRate, testData.baseCurrency);
        expect(formattedExchangeRate).toBe('1.0 EUR');
    });

    it('should return the formatted rate with digits after decimal to be at least as much as precision', () => {
        const testData = { baseCurrency: 'EUR', exchangeRate: '10', precision: 2 };
        const formattedExchangeRate = utils.getFormattedExchangeRate(
            testData.exchangeRate,
            testData.baseCurrency,
            testData.precision
        );
        expect(formattedExchangeRate).toBe('0.10 EUR'); // 1/10, rounded to 2 decimal places
    });

    it('should return the formatted rate with digits after decimal to be at least as much as precision excluding 0s if less than 1', () => {
        const testData = { baseCurrency: 'EUR', exchangeRate: '120', precision: 2 };
        const formattedExchangeRate = utils.getFormattedExchangeRate(
            testData.exchangeRate,
            testData.baseCurrency,
            testData.precision
        );
        // 1/120=0.008333, rounded to 2 decimal places after leading zeroes in decimal part
        expect(formattedExchangeRate).toBe('0.0083 EUR');
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
