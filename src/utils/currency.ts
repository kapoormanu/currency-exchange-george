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
const getFormattedExchangeRate = (exchangeRate: string, baseCurrency: string, minPrecision: number = 0) => {
    // get the part after decimal and return its length.
    const implicitPrecision = (exchangeRate.split('.')[1] || []).length;

    let formattedExchangeRate;

    if (!exchangeRate || isNaN(Number(exchangeRate))) {
        formattedExchangeRate = `-- ${baseCurrency}`;
    } else {
        formattedExchangeRate = `${Number(exchangeRate).toFixed(
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
const utils = {
    getFormattedExchangeRate,
    getCountryFromCurrency,
    getImgUrlForCountry,
    transformJSONToAllStrings
};

export default utils;
