import { ApiClient } from 'http/ApiClient';

export function CurrencyService(client: ApiClient) {
    return async () => {
        return await client.getCurrenciesData();
    };
}
