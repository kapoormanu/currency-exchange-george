import searchReducer from 'components/SearchBar/redux/searchSlice';
import currencyReducer from 'components/Currency/redux/currenciesDataSlice';

// Combine all slice reducers here. No need to use combineReducers
// as RTK does this automatically
const rootReducer = {
    search: searchReducer,
    currencyData: currencyReducer
};

export default rootReducer;
