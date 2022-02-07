import { RootState } from 'app/store';
import { Currency } from 'types/currency';
import { apiStatus } from 'types/global';

export const getAllCurrencies = (state: RootState): Currency[] => state.currencyData.currencies;

export const getFilteredCurrencies = (state: RootState): Currency[] => state.currencyData.filteredCurrencies;

export const getBaseCurrency = (state: RootState): string => state.currencyData.baseCurrency;

export const getLoadingStatus = (state: RootState): apiStatus => state.currencyData.status;
