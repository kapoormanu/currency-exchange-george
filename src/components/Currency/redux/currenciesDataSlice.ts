import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { currenciesDataInitialState } from 'types/currency';
import { apiState } from 'types/global';
import utils from 'utils/currency';
import { currencyService } from 'http/apiServices';
import { updateFilteredCurrenciesReducer } from './currenciesReducers';

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
            .addCase(fetchCurrencies.pending, (state, action) => {
                state.status.state = apiState.LOADING;
            })
            .addCase(fetchCurrencies.fulfilled, (state, action) => {
                state.status.state = apiState.SUCCESS;
                // Stringify data and then set state variables
                const { baseCurrency, fx } = utils.transformJSONToAllStrings(action.payload);
                state.baseCurrency = baseCurrency;
                state.currencies = fx;
                state.filteredCurrencies = fx;
            })
            .addCase(fetchCurrencies.rejected, (state, action) => {
                state.status.state = apiState.FAILURE;
                state.status.error = action.error.message || 'Unkown Server Error';
            });
    }
});

export const currenciesActions = currenciesDataSlice.actions;

export default currenciesDataSlice.reducer;
