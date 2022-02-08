import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { currenciesDataInitialState } from 'types/currency';
import {
    onFetchCurrenciesFailure,
    onFetchCurrenciesPending,
    onFetchCurrenciesSuccess,
    updateFilteredCurrenciesReducer
} from 'components/Currency/redux/currenciesReducers';

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
            .addCase(fetchCurrencies.fulfilled, onFetchCurrenciesSuccess)
            .addCase(fetchCurrencies.rejected, onFetchCurrenciesFailure);
    }
});

export const currenciesActions = currenciesDataSlice.actions;

export default currenciesDataSlice.reducer;
