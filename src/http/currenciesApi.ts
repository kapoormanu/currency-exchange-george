import { httpService } from 'http/axiosService';
import { currenciesResponse } from './currenciesResponse';
import { GET_CURRENCIES_ENDPOINT } from './endpoints';

export function getCurrenciesResponse() {
    return async (): Promise<currenciesResponse> => {
        const { data } = await httpService.get(GET_CURRENCIES_ENDPOINT);
        return data;
    };
}
