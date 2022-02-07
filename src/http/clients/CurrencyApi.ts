import { Currency } from 'types/currency';

export interface CurrencyApi {
    getCurrenciesData: () => Promise<currenciesResponseData>;
}

export type currenciesResponseData = {
    baseCurrency: string;
    fx: Currency[];
};
