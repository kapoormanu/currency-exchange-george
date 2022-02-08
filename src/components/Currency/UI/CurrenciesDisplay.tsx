import React from 'react';
import { Currency } from 'types/currency';
import { apiState } from 'types/global';

type CurrenciesDisplayProps = {
    loadingStatus: apiState;
    filteredCurrencies: Currency[];
    currencyItems: JSX.Element | JSX.Element[];
};
const CurrenciesDisplay = (props: CurrenciesDisplayProps) => {
    return (
        <>
            {props.loadingStatus === apiState.LOADING && <div>Loading Currencies...</div>}
            {props.loadingStatus === apiState.FAILURE && (
                <div role='alert' className='fade alert alert-danger show'>
                    Oops. There was an Error fetching currencies.
                </div>
            )}
            {props.loadingStatus === apiState.SUCCESS && (
                <table>
                    <caption id='currency-list'>Currency List</caption>
                    <thead>
                        <tr>
                            <th id='flag'>Flag</th>
                            <th id='currency'>Currency</th>
                            <th id='country'>Country</th>
                            <th id='buy'>Buy</th>
                            <th id='sell'>Sell</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.filteredCurrencies.length > 0 && props.currencyItems}
                        {props.filteredCurrencies.length === 0 && (
                            <tr>
                                <td colSpan={5} role='alert' className='fade alert alert-danger show'>
                                    No currencies available.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
        </>
    );
};

export default CurrenciesDisplay;
