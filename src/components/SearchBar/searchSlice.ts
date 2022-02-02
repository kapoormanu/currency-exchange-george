import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Describes the shape of the search slice
interface SearchState {
    searchField: string;
}
const initialState: SearchState = {
    searchField: ''
};

// Create the search slice
export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        // action to set the search value
        setSearch(state: SearchState, action: PayloadAction<string>) {
            state.searchField = action.payload;
        }
    }
});

export const searchActions = searchSlice.actions;

export default searchSlice.reducer;
