import { apiState, apiStatus } from 'types/global';

export type Currency = {
    currency: string;
    nameI18N?: string;
    exchangeRate?: {
        buy: string;
        sell: string;
    };
    flags?: string[];
    precision?: number;
};

// Describes the shape of the currencies data
export interface currenciesDataState {
    currencies: Currency[];
    filteredCurrencies: Currency[];
    baseCurrency: string;
    status: apiStatus;
}

//Provide initial state
export const currenciesDataInitialState: currenciesDataState = {
    currencies: [],
    filteredCurrencies: [],
    baseCurrency: '',
    status: {
        state: apiState.PRISTINE,
        error: null
    }
};
