import { ApiClient } from 'http/ApiClient';

export function HttpCurrencyService(client: ApiClient) {
    return {
        getCurrenciesData: async () => {
            return await client.getCurrenciesData();
        }
    };
}
