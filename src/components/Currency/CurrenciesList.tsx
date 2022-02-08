import React from 'react';

import { useGetCurrenciesListData } from './redux/useGetCurrenciesListData';
import CurrenciesDisplay from './UI/CurrenciesDisplay';

function CurrenciesList() {
    const { loadingStatus, filteredCurrencies, currencyItems } = useGetCurrenciesListData();
    return (
        <>
            <CurrenciesDisplay
                loadingStatus={loadingStatus}
                filteredCurrencies={filteredCurrencies}
                currencyItems={currencyItems}
            />
        </>
    );
}

export default CurrenciesList;
