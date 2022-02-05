import React from 'react';
import 'i18n/i18n';

import Header from 'components/Header/Header';
import SearchBar from 'components/SearchBar/SearchBar';
import CurrencyList from 'components/Currency/CurrencyList';

function App() {
    return (
        <>
            <Header />
            <SearchBar />
            <CurrencyList />
        </>
    );
}

export default App;
