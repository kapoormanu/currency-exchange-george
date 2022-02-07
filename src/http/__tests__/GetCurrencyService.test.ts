import { server } from 'mocks/mockServer';
import { currencyHandlerEmpty, currencyHandlerException } from 'mocks/handlers';
import fxData from 'mocks/data/fx.json';

import { CurrencyService } from 'http/services/GetCurrencyService';
import { AxiosHttpClient } from 'http/clients/AxiosHttpClient';
import { currenciesResponseData } from 'http/currenciesResponse';

let getCurrencies: ReturnType<typeof CurrencyService>;

beforeEach(() => {
    // Inject with client of choice, preferably same as used elsewhere in the app.
    getCurrencies = CurrencyService(AxiosHttpClient());
});

describe('currenciesApi', () => {
    it('should return fx data when API runs successfully', async () => {
        const response = await getCurrencies();

        expect(response.fx).toEqual(fxData.fx);
    });
    it('should return failure when API returns 500 status', async () => {
        server.use(currencyHandlerException);
        const Error500 = new Error('Request failed with status code 500');

        let response;
        try {
            response = await getCurrencies();
        } catch (err) {
            response = err;
        }

        expect(response).toEqual(Error500);
    });
    it('should return empty fx array when API response doesnt have data', async () => {
        server.use(currencyHandlerEmpty);

        const response: currenciesResponseData = await getCurrencies();

        expect(response.fx).toEqual([]);
    });
});
