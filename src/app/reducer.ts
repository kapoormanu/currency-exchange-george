import searchReducer from 'components/SearchBar/searchSlice';

// Combine all slice reducers here. No need to use combineReducers
// as RTK does this automatically
const rootReducer = {
    search: searchReducer
};

export default rootReducer;
