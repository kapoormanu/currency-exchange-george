import { RootState } from 'app/store';
import { Currency } from 'types/currency';
import { apiStatus } from 'types/global';

// Gets filtered currencies (different from all currencies)
export const getFilteredCurrencies = (state: RootState): Currency[] => state.currencyData.filteredCurrencies;

// Get the base currency used to display the exchange rates
export const getBaseCurrency = (state: RootState): string => state.currencyData.baseCurrency;

// Get the loading status for the fetch call
export const getLoadingStatus = (state: RootState): apiStatus => state.currencyData.status;
