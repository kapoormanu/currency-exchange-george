import { Currency } from 'types/currency';
import { apiState } from 'types/global';

export interface currenciesResponse {
    data: {
        baseCurrency?: string;
        fx?: Currency[];
    };
    status: apiState;
}
