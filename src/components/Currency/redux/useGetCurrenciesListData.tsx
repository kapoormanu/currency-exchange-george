import React, { useEffect } from 'react';

// Redux related imports.
import { useAppDispatch, useAppSelector } from 'app/redux/hooks';
import { searchSelector } from 'components/SearchBar/redux/searchBarSelectors';
import { currenciesActions, fetchCurrencies } from 'components/Currency/redux/currenciesDataSlice';
import {
    getBaseCurrency,
    getFilteredCurrencies,
    getLoadingStatus
} from 'components/Currency/redux/currenciesDataSelector';
import CurrencyItem from 'components/Currency/UI/CurrencyItem';
import { apiState } from 'types/global';

export const useGetCurrenciesListData = () => {
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
        } else {
            dispatch(currenciesActions.updateFilteredCurrencies(searchField));
        }
    }, [loadingStatus, dispatch, searchField]);

    return { currencyItems, loadingStatus, filteredCurrencies, baseCurrency };
};
