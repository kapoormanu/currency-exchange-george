import { currenciesResponseData } from 'http/currenciesResponse';

export interface ApiClient {
    getCurrenciesData: () => Promise<currenciesResponseData>;
}
