import React from 'react';

import { useGetCurrenciesListData } from './redux/useGetCurrenciesListData';
import CurrenciesDisplay from './UI/CurrenciesDisplay';

function CurrenciesList() {
    const { loadingStatus, filteredCurrencies, currencyItems, baseCurrency } = useGetCurrenciesListData();
    return (
        <>
            <CurrenciesDisplay
                loadingStatus={loadingStatus}
                filteredCurrencies={filteredCurrencies}
                currencyItems={currencyItems}
                baseCurrency={baseCurrency}
            />
        </>
    );
}

export default CurrenciesList;
