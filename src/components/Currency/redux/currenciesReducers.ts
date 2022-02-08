import { WritableDraft } from 'immer/dist/internal';
import { PayloadAction } from '@reduxjs/toolkit/dist/createAction';
import { SerializedError } from '@reduxjs/toolkit/dist/createAsyncThunk';

import { currenciesDataState } from 'types/currency';
import { apiState } from 'types/global';
import utils from 'utils/currency';

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

export const onFetchCurrenciesPending = function (state: WritableDraft<currenciesDataState>) {
    state.status.state = apiState.LOADING;
};
export const onFetchCurrenciesFailure = (state: WritableDraft<currenciesDataState>, action: actionTypeFailure) => {
    state.status.state = apiState.FAILURE;
    state.status.error = action.error.message || 'Unkown Server Error';
};
