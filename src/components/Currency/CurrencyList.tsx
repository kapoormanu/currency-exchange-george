import React, { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import CurrencyItem from 'components/Currency/CurrencyItem';
import { apiState } from 'types/global';
import { fetchCurrencies } from 'components/Currency/currencySlice';
import { getAllCurrencies, getBaseCurrency, getLoadingStatus } from 'components/Currency/currencySelector';

function CurrencyList() {
    const dispatch = useAppDispatch();
    const { state: loadingStatus } = useAppSelector(getLoadingStatus);
    const currencies = useAppSelector(getAllCurrencies);
    const baseCurrency = useAppSelector(getBaseCurrency);
    const currencyItems = currencies.length ? (
        currencies.map((currency) => (
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

    return (
        <>
            {loadingStatus === apiState.LOADING && <div>Loading Currencies...</div>}
            {loadingStatus === apiState.FAILURE && (
                <div role='alert' className='fade alert alert-danger show'>
                    Oops. There was an Error fetching currencies.
                </div>
            )}
            {loadingStatus === apiState.SUCCESS && currencies.length && (
                <table>
                    <thead>
                        <tr>
                            <th id='flag'>Flag</th>
                            <th id='currency'>Currency</th>
                            <th id='country'>Country</th>
                            <th id='buy'>Buy</th>
                            <th id='sell'>Sell</th>
                        </tr>
                    </thead>
                    <tbody>{currencyItems}</tbody>
                </table>
            )}
            {loadingStatus === apiState.SUCCESS && !currencies.length && (
                <div role='alert' className='fade alert alert-danger show'>
                    No currencies available.
                </div>
            )}
        </>
    );
}

export default CurrencyList;
