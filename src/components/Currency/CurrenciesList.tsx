import React, { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from 'app/redux/hooks';
import { apiState } from 'types/global';

import CurrencyItem from 'components/Currency/CurrencyItem';
import {
    getBaseCurrency,
    getFilteredCurrencies,
    getLoadingStatus
} from 'components/Currency/redux/currenciesDataSelector';
import { currenciesActions, fetchCurrencies } from 'components/Currency/redux/currenciesDataSlice';

import { searchSelector } from 'components/SearchBar/redux/searchBarSelectors';

function CurrenciesList() {
    const { loadingStatus, filteredCurrencies, currencyItems } = useGetCurrenciesListData();
    return (
        <>
            {loadingStatus === apiState.LOADING && <div>Loading Currencies...</div>}
            {loadingStatus === apiState.FAILURE && (
                <div role='alert' className='fade alert alert-danger show'>
                    Oops. There was an Error fetching currencies.
                </div>
            )}
            {loadingStatus === apiState.SUCCESS && (
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
                        {filteredCurrencies.length > 0 && currencyItems}
                        {filteredCurrencies.length === 0 && (
                            <div role='alert' className='fade alert alert-danger show'>
                                No currencies available.
                            </div>
                        )}
                    </tbody>
                </table>
            )}
        </>
    );
}

export default CurrenciesList;
