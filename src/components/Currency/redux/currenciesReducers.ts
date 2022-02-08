import { PayloadAction } from '@reduxjs/toolkit';

import { currenciesDataState } from 'types/currency';
import { WritableDraft } from 'immer/dist/internal';
import { apiState } from 'types/global';

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

export const onFetchCurrenciesPending = function (state: WritableDraft<currenciesDataState>) {
    state.status.state = apiState.LOADING;
};
