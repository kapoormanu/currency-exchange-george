import { PayloadAction } from '@reduxjs/toolkit';

import { currenciesDataState } from 'types/currency';
import utils from 'utils/currency';

export const updateFilteredCurrenciesReducer = (state: currenciesDataState, action: PayloadAction<string>) => {
    if (action.payload) {
        state.filteredCurrencies = state.currencies.filter((currency) =>
            utils.isSearchTermPresentInCurrency(currency, action.payload)
        );
    } else {
        state.filteredCurrencies = state.currencies;
    }
};
