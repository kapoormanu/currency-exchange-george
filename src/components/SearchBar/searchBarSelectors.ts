import { RootState } from 'app/store';

// get the search slice to use in SearchBar
export function searchSelector(state: RootState) {
    return state.search;
}
