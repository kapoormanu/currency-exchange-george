import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

import App from 'app/App';
import { store } from 'app/store';

function setupApp() {
    render(
        <Provider store={store}>
            <App />
        </Provider>
    );
}
describe('<App />', () => {
    it('renders app', () => {
        setupApp();
    });
    it('renders the Header successfully', () => {
        setupApp();
        expect(screen.getByRole('heading')).toBeInTheDocument();
    });
    it('renders the searchbar successfully', () => {
        setupApp();
        expect(screen.getByRole('searchbox')).toBeInTheDocument();
    });
});
