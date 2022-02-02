import React from 'react';
import { Currency } from 'types/currency';
import utils from 'utils/currency';

type CurrencyItemProps = {
    currencyData: Currency;
    baseCurrency: string;
};

/**
 * CurrencyItem Component. Outputs the following four items for a currency:
 * * Flag of the country
 * * Currency of the country
 * * Name of the country
 * * Exchange rate of that currency wrt base currency
 *
 * @component
 * @param {CurrencyItemProps} props the props passed to the component
 * @property {Currency} props.currencyData Currency data
 * @property {string} props.baseCurrency base currency string (e.g. 'EUR')
 * @returns {JSX.Element} a JSX element composing the CurrencyItem
 */
function CurrencyItem({ currencyData, baseCurrency }: CurrencyItemProps) {
    const country = utils.getCountryFromCurrency(currencyData.currency);
    const imgUrl = utils.getImgUrlForCountry(country);

    return (
        <>
            <img src={imgUrl} alt={currencyData.nameI18N || country} />
            <div>{currencyData?.currency}</div>
            <div>{currencyData?.nameI18N || 'N/A'}</div>
            <div>
                {utils.getFormattedExchangeRate(
                    currencyData.exchangeRate?.buy || '',
                    baseCurrency,
                    currencyData.precision
                )}
            </div>
        </>
    );
}

export default CurrencyItem;
