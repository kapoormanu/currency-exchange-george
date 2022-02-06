import React, { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import { apiState } from 'types/global';

import CurrencyItem from 'components/Currency/CurrencyItem';
import { getBaseCurrency, getFilteredCurrencies, getLoadingStatus } from 'components/Currency/currencySelector';
import { currencyActions, fetchCurrencies } from 'components/Currency/currencySlice';

import { searchSelector } from 'components/SearchBar/searchBarSelectors';

function CurrencyList() {
    const dispatch = useAppDispatch();
    const { state: loadingStatus } = useAppSelector(getLoadingStatus);
    const { searchField } = useAppSelector(searchSelector);
    const filteredCurrencies = useAppSelector(getFilteredCurrencies);
    const baseCurrency = useAppSelector(getBaseCurrency);
    const currencyItems = filteredCurrencies.length ? (
        filteredCurrencies.map((currency) => (
            // React gives a false warning about this line that this shouldn't be wrapped in a <div>
            <CurrencyItem key={currency.currency} baseCurrency={baseCurrency} currencyData={currency} />
        ))
    ) : (
        <></>
    );
    useEffect(() => {
        if (loadingStatus === apiState.PRISTINE) {
            dispatch(fetchCurrencies());
        }
    }, [loadingStatus, dispatch]);

    useEffect(() => {
        dispatch(currencyActions.updateFilteredCurrencies(searchField));
    }, [searchField, dispatch]);
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

export default CurrencyList;
