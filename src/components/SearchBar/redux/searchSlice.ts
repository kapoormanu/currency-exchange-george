import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Describes the shape of the search slice
interface searchState {
    searchField: string;
}
const initialState: searchState = {
    searchField: ''
};

// Create the search slice
export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        // action to set the search value
        setSearch(state: searchState, action: PayloadAction<string>) {
            state.searchField = action.payload;
        }
    }
});

export const searchActions = searchSlice.actions;

export default searchSlice.reducer;
