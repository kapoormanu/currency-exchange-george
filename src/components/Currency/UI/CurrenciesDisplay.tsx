import { useAppSelector } from 'app/redux/hooks';
import React from 'react';
import { Currency } from 'types/currency';
import { apiState } from 'types/global';
import { getBaseCurrency } from '../redux/currenciesDataSelector';
import { TableComposer } from './TableComposer';

type CurrenciesDisplayProps = {
    loadingStatus: apiState;
    filteredCurrencies: Currency[];
    currencyItems: JSX.Element | JSX.Element[];
    baseCurrency: string;
};
const CurrenciesDisplay = (props: CurrenciesDisplayProps) => {
    const tableHeaders = ['Flag', 'Currency', 'Country', 'Buy', 'Sell'];
    return (
        <>
            {props.loadingStatus === apiState.LOADING && <div>Loading Currencies...</div>}
            {props.loadingStatus === apiState.FAILURE && (
                <div role='alert' className='fade alert alert-danger show'>
                    Oops. There was an Error fetching currencies.
                </div>
            )}
            <TableComposer
                rows={props.filteredCurrencies}
                headers={tableHeaders}
                baseCurrency={props.baseCurrency}
                loadingFailure={props.loadingStatus === apiState.FAILURE}></TableComposer>
        </>
    );
};

export default CurrenciesDisplay;
