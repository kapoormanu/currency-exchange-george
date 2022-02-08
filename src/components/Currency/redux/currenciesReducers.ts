import { WritableDraft } from 'immer/dist/internal';
import { PayloadAction } from '@reduxjs/toolkit/dist/createAction';
import { SerializedError } from '@reduxjs/toolkit/dist/createAsyncThunk';

import { currenciesDataState } from 'types/currency';
import { currenciesResponseData } from 'http/clients/CurrencyApi';
import { apiState } from 'types/global';
import utils from 'utils/currency';

type actionTypeSuccess = PayloadAction<
    currenciesResponseData,
    string,
    {
        arg: void;
        requestId: string;
        requestStatus: 'fulfilled';
    },
    never
>;

type actionTypeFailure = PayloadAction<
    unknown,
    string,
    {
        arg: void;
        requestId: string;
        requestStatus: 'rejected';
        aborted: boolean;
        condition: boolean;
    } & (
        | {
              rejectedWithValue: true;
          }
        | {
              rejectedWithValue: false;
          }
    ),
    SerializedError
>;

export const updateFilteredCurrenciesReducer = (state: currenciesDataState, action: PayloadAction<string>) => {
    if (action.payload) {
        state.filteredCurrencies = state.currencies.filter((currency) =>
            utils.isSearchTermPresentInCurrency(currency, action.payload)
        );
    } else {
        state.filteredCurrencies = state.currencies;
    }
};

export const onFetchCurrenciesPending = (state: WritableDraft<currenciesDataState>) => {
    state.status.state = apiState.LOADING;
};

export const onFetchCurrenciesSuccess = (state: WritableDraft<currenciesDataState>, action: actionTypeSuccess) => {
    state.status.state = apiState.SUCCESS;
    // Stringify data and then set state variables
    const { baseCurrency, fx } = utils.transformJSONToAllStrings(action.payload);
    state.baseCurrency = baseCurrency;
    state.currencies = fx;
    state.filteredCurrencies = fx;
};
export const onFetchCurrenciesFailure = (state: WritableDraft<currenciesDataState>, action: actionTypeFailure) => {
    state.status.state = apiState.FAILURE;
    state.status.error = action.error.message || 'Unkown Server Error';
};
