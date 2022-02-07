import { server } from 'mocks/mockServer';
import { currencyHandlerEmpty, currencyHandlerException } from 'mocks/handlers';
import fxData from 'mocks/data/fx.json';

import { currencyService } from 'http/apiServices';

describe('CurrencyApi', () => {
    it('should return fx data when API runs successfully', async () => {
        const response = await currencyService.getCurrenciesData();

        expect(response.fx).toEqual(fxData.fx);
    });

    it('should return failure when API returns 500 status', async () => {
        server.use(currencyHandlerException);
        const Error500 = new Error('Request failed with status code 500');

        let response;
        try {
            response = await currencyService.getCurrenciesData();
        } catch (err) {
            response = err;
        }

        expect(response).toEqual(Error500);
    });
    it('should return empty fx array when API response doesnt have data', async () => {
        server.use(currencyHandlerEmpty);

        const response = await currencyService.getCurrenciesData();

        expect(response.fx).toEqual([]);
    });
});
