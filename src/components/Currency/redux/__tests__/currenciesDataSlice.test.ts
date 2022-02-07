import currencyReducer, {
    currenciesActions,
    currenciesDataInitialState
} from 'components/Currency/redux/currenciesDataSlice';
import fxData from 'mocks/data/fx.json';
import { Currency } from 'types/currency';
import utils from 'utils/currency';

describe('currencyReducer', () => {
    it('should update filtered currencies using search term', () => {
        const searchTerm = 'eu';
        const fxDataStringified = utils.transformJSONToAllStrings(fxData);
        const testFilteredCurrencies: Currency[] = fxDataStringified.fx.filter((currency: Currency) => {
            return utils.isSearchTermPresentInCurrency(currency, searchTerm);
        });

        const { filteredCurrencies } = currencyReducer(
            { ...currenciesDataInitialState, currencies: fxDataStringified.fx },
            currenciesActions.updateFilteredCurrencies(searchTerm)
        );

        expect(filteredCurrencies).toHaveLength(testFilteredCurrencies.length);
    });
});
