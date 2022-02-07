import axios from 'axios';
import { ApiClient } from 'http/ApiClient';
import { currenciesResponseData } from 'http/currenciesResponse';
import { GET_CURRENCIES_ENDPOINT } from 'http/endpoints';

export function AxiosHttpClient(): ApiClient {
    return {
        getCurrenciesData: async (): Promise<currenciesResponseData> => {
            const { data } = await axios.get(GET_CURRENCIES_ENDPOINT);
            const retObj: currenciesResponseData = {
                baseCurrency: data.baseCurrency,
                fx: data.fx
            };
            return retObj;
        }
    };
}
