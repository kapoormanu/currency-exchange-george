import React from 'react';

function SearchBar() {
    const [searchField, setSearchField] = React.useState('');

    const handleSearchFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setSearchField(value);
    };

    return (
        <div className='SearchBar' data-testid='Search-Bar'>
            <label htmlFor='searchField'>Search:</label>
            <input
                type='search'
                name='searchField'
                id='searchField'
                value={searchField}
                onChange={handleSearchFieldChange}
            />
        </div>
    );
}

export default SearchBar;
