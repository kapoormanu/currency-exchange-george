import React from 'react';
import { Currency } from 'types/currency';
import utils from 'utils/currency';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

type CurrencyItemProps = {
    currencyData: Currency;
    baseCurrency: string;
};

/**
 * CurrencyItem Component. Outputs the following five items as a table row for a currency:
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
        <TableRow key={currencyData.currency}>
            <TableCell headers='flag'>
                <img src={imgUrl} alt={currencyData.nameI18N || country} />
            </TableCell>

            <TableCell headers='currency'>{currencyData?.currency}</TableCell>
            <TableCell headers='country'>{currencyData?.nameI18N || 'N/A'}</TableCell>
            <TableCell headers='buy'>
                {utils.getFormattedExchangeRate(
                    currencyData.exchangeRate?.buy || '',
                    baseCurrency,
                    currencyData.precision
                )}
            </TableCell>
            <TableCell headers='sell'>
                {utils.getFormattedExchangeRate(
                    currencyData.exchangeRate?.sell || '',
                    baseCurrency,
                    currencyData.precision
                )}
            </TableCell>
        </TableRow>
    );
}

export default CurrencyItem;
