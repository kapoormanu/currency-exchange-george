import { Currency } from 'types/currency';
import { apiState } from 'types/global';

type currenciesResponseData = {
    baseCurrency?: string;
    fx?: Currency[];
};

export interface currenciesResponse {
    data: currenciesResponseData;
    status: apiState;
}
