import searchReducer from 'components/SearchBar/searchSlice';
import currencyReducer from 'components/Currency/redux/currencySlice';

// Combine all slice reducers here. No need to use combineReducers
// as RTK does this automatically
const rootReducer = {
    search: searchReducer,
    currency: currencyReducer
};

export default rootReducer;
