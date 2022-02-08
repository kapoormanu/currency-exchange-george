import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { currenciesDataInitialState } from 'types/currency';
import { apiState } from 'types/global';
import {
    onFetchCurrenciesPending,
    updateFilteredCurrenciesReducer
} from 'components/Currency/redux/currenciesReducers';

import utils from 'utils/currency';
import { currencyService } from 'http/apiServices';

const SLICE_NAME = 'currenciesData';
const FETCH_CURRENCIES_THUNK_NAME = `${SLICE_NAME}/fetchCurrencies`;

export const fetchCurrencies = createAsyncThunk(FETCH_CURRENCIES_THUNK_NAME, currencyService.getCurrenciesData);

// Create the currencies data slice
export const currenciesDataSlice = createSlice({
    name: 'currenciesData',
    initialState: currenciesDataInitialState,
    reducers: {
        updateFilteredCurrencies: updateFilteredCurrenciesReducer
    },
    extraReducers(builder) {
        builder
            .addCase(fetchCurrencies.pending, onFetchCurrenciesPending)
            .addCase(fetchCurrencies.fulfilled, (state, action) => {
                state.status.state = apiState.SUCCESS;
                // Stringify data and then set state variables
                const { baseCurrency, fx } = utils.transformJSONToAllStrings(action.payload);
                state.baseCurrency = baseCurrency;
                state.currencies = fx;
                state.filteredCurrencies = fx;
            })
            .addCase(fetchCurrencies.rejected, onFetchCurrenciesFailure);
    }
});

export const currenciesActions = currenciesDataSlice.actions;

export default currenciesDataSlice.reducer;
