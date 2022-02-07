import { Currency } from 'types/currency';

/**
 * @function getFormattedExchangeRate
 * Formats a given set of currency values to return a formatted exchange rate.
 * Values for numbers are expected in string since JS loses trailing zeroes for number type.
 *
 * @param {string} exchangeRate The exchange rate
 * @param {string} baseCurrency The symbol of the base currency (e.g. EUR, INR)
 * @param {number} minPrecision The minimum number of trailing decimals to show
 *
 * @returns {string} A formatted string representing the exchange rate
 */
const getFormattedExchangeRate = (exchangeRate: string, baseCurrency: string, minPrecision = 0) => {
    /**
     * @function formatExchangeRate
     * Formats the exchange rate using appropriate number of decimals
     * @private
     *
     * @param {number} rateInBaseCurrency The exchange rate
     * @param {number} precision The minimum number of trailing decimals to show
     *
     * @returns {string} formatted exchange rate
     */
    const formatExchangeRate = (rateInBaseCurrency: number, precision: number) => {
        if (rateInBaseCurrency >= 1) {
            return `${rateInBaseCurrency.toFixed(precision)}`;
        } else {
            // Return decimal and following continuous zeroes. e.g. 1.0005 => .000
            const decimalWithZeros = /\.[0]+/;

            // Preserve as many decimals as possible
            const rateString = rateInBaseCurrency.toFixed(20);

            // Gets the length of data returned by regex. Safe checks as it could be empty string due to no match
            const leadingZeroesInDecimalPart: number = ((rateString.match(decimalWithZeros) || '')[0] || []).length;

            // Add leadingZeroesInDecimalPart if greater than 1 and Subtract one for the period:'.'
            const precisionToUse =
                leadingZeroesInDecimalPart > 1 ? leadingZeroesInDecimalPart + precision - 1 : precision;
            return `${rateInBaseCurrency.toFixed(precisionToUse)}`;
        }
    };

    // get the part after decimal and return its length.
    const implicitPrecision = (exchangeRate.split('.')[1] || []).length;
    const isExchangeRateInValid = !exchangeRate || isNaN(Number(exchangeRate)) || Number(exchangeRate) === 0;

    let formattedExchangeRate;

    if (isExchangeRateInValid) {
        formattedExchangeRate = `-- ${baseCurrency}`;
    } else {
        const rateInBaseCurrency = 1 / parseFloat(exchangeRate);
        formattedExchangeRate = `${formatExchangeRate(
            rateInBaseCurrency,
            Math.max(implicitPrecision, minPrecision)
        )} ${baseCurrency}`;
    }
    return formattedExchangeRate;
};

/**
 * @function getCountryFromCurrency
 * Formats a given set of currency values to return a formatted exchange rate.
 * Values for numbers are expected in string since JS loses trailing zeroes for number type.
 *
 * @param {string} currency Currency symbol
 *
 * @returns {string} A 2-letter lower case representation corresponding to the country
 */
const getCountryFromCurrency = (currency: string) => currency.substring(0, 2).toLowerCase();

/**
 * @function getImgUrlForCountry
 * Returns the image url for supplied country code or placeholder if not found.
 *
 * @param {string} country A 2-letter lower case representation corresponding to the country
 * @returns {any} A 2-letter lower case representation corresponding to the country
 */
const getImgUrlForCountry = (country: string) => {
    let imgUrl;
    try {
        imgUrl = require(`assets/flags/${country}.png`);
    } catch (e) {
        // if image can't be found, return placeholder
        imgUrl = 'https://via.placeholder.com/70x47/83ddff/2f2f2f?text=No+Flag';
    }
    return imgUrl;
};

/**
 * @function transformJSONToAllStrings
 * Returns all members of the data stringified.
 * This is necessary to prevent losing trailing zeroes received in JSON.
 * Ideally, the API should return numbers as string.
 *
 * @param {Object} data Data to transform
 * @returns {Object} data transformed to JSON with all keys and values as strings
 * @example
 *  { "obj1": [ {"n1": 1.1, "n2": true}, {"n1": 1, "n2": "null"} ] }
    transforms to 
    { "obj1": [ {"n1": "1.1", "n2": "true"}, {"n1": "1", "n2": "null"} ] }
 */
const transformJSONToAllStrings = (data: any) => {
    const json = JSON.stringify(data);
    const dataWithStrings = JSON.parse(json, (key, val) =>
        typeof val !== 'object' && val !== null ? String(val) : val
    );
    return dataWithStrings;
};

/**
 * @function isSearchTermPresentInCurrency
 * Checks whether the given search term is present in the currency name(currency.nameI18N) or symbol (currency.currency)
 *
 * @param {Currency} currency Currency object to check in
 * @param {string} searchTerm search term to find in currency
 * @returns {Boolean} true if currency has searchTerm, false otherwise
 */
const isSearchTermPresentInCurrency = (currency: Currency, searchTerm: string) => {
    const searchName = Number(currency.nameI18N?.search(new RegExp(searchTerm, 'i')));
    const searchCurrencySymbol = Number(currency.currency.search(new RegExp(searchTerm, 'i')));
    return (!isNaN(searchName) && searchName >= 0) || (!isNaN(searchCurrencySymbol) && searchCurrencySymbol >= 0);
};

const utils = {
    getFormattedExchangeRate,
    getCountryFromCurrency,
    getImgUrlForCountry,
    transformJSONToAllStrings,
    isSearchTermPresentInCurrency
};

export default utils;
