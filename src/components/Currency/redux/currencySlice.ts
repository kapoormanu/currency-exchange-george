import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Currency } from 'types/currency';
import { apiStatus, apiState } from 'types/global';
import utils from 'utils/currency';
import { getCurrenciesResponse } from '../../../http/currenciesApi';

// Describes the shape of the currency slice
interface currencyState {
    currencies: Currency[];
    filteredCurrencies: Currency[];
    baseCurrency: string;
    status: apiStatus;
}

//Provide initial state
export const currencyInitialState: currencyState = {
    currencies: [],
    filteredCurrencies: [],
    baseCurrency: '',
    status: {
        state: apiState.PRISTINE,
        error: null
    }
};

export const fetchCurrencies = createAsyncThunk('currency/fetchCurrencies', getCurrenciesResponse());

// Create the currency slice
export const currencySlice = createSlice({
    name: 'currency',
    initialState: currencyInitialState,
    reducers: {
        updateFilteredCurrencies(state: currencyState, action: PayloadAction<string>) {
            if (action.payload) {
                state.filteredCurrencies = state.currencies.filter((currency) =>
                    utils.isSearchTermPresentInCurrency(currency, action.payload)
                );
            } else {
                state.filteredCurrencies = state.currencies;
            }
        }
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

export const currencyActions = currencySlice.actions;

export default currencySlice.reducer;
