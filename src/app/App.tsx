import React from 'react';
import 'i18n/i18n';

import Header from 'components/Header/Header';
import SearchBar from 'components/SearchBar/SearchBar';
import CurrenciesList from 'components/Currency/CurrenciesList';

function App() {
    const searchParams = new URLSearchParams(window.location.search);
    return (
        <>
            <Header />
            <SearchBar searchTerm={searchParams.get('search') || ''} />
            <CurrenciesList />
        </>
    );
}

export default App;
