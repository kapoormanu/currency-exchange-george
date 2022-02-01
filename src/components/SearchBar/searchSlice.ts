import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchState {
    searchField: string;
}
const initialState: SearchState = {
    searchField: ''
};

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearch(state: SearchState, action: PayloadAction<string>) {
            state.searchField = action.payload;
        }
    }
});

export const searchActions = searchSlice.actions;

export default searchSlice.reducer;
