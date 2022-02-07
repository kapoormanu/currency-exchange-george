import searchReducer, { searchActions } from 'components/SearchBar/redux/searchSlice';

describe('searchReducer', () => {
    it('should return state with set value', () => {
        const { searchField } = searchReducer(undefined, searchActions.setSearch('test'));
        expect(searchField).toBe('test');
    });
});
