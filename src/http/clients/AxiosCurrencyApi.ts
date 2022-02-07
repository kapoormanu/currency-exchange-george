import axios from 'axios';
import { CurrencyApi } from 'http/clients/CurrencyApi';
import { currenciesResponseData } from 'http/clients/CurrencyApi';
import { GET_CURRENCIES_ENDPOINT } from 'http/endpoints';

export function AxiosCurrencyApi(): CurrencyApi {
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
