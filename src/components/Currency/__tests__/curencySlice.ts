import currencyReducer, { currencyActions, currencyInitialState } from 'components/Currency/currencySlice';
import fxData from 'mocks/data/fx.json';
import { Currency } from 'types/currency';
import utils from 'utils/currency';

describe('currencyReducer', () => {
    it('should update filtered currencies using search term', () => {
        const searchTerm = 'eu';
        const fxDataStringified = utils.transformJSONToAllStrings(fxData);
        const { filteredCurrencies } = currencyReducer(
            { ...currencyInitialState, currencies: fxDataStringified.fx },
            currencyActions.updateFilteredCurrencies(searchTerm)
        );
        const testFilteredCurrencies: Currency[] = fxDataStringified.fx.filter((currency: Currency) =>
            utils.isSearchTermPresentInCurrency(currency, searchTerm)
        );

        expect(filteredCurrencies.length).toBe(testFilteredCurrencies.length);
    });
});
