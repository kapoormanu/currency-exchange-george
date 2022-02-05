import { RootState } from 'app/store';
import { Currency } from 'types/currency';
import { apiStatus } from 'types/global';

export const getAllCurrencies = (state: RootState): Currency[] => state.currency.currencies;

export const getBaseCurrency = (state: RootState): string => state.currency.baseCurrency;

export const getLoadingStatus = (state: RootState): apiStatus => state.currency.status;
