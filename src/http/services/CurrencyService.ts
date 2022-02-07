import { ApiClient } from 'http/ApiClient';

export function CurrencyService(client: ApiClient) {
    return {
        getCurrenciesData: async () => {
            return await client.getCurrenciesData();
        }
    };
}
