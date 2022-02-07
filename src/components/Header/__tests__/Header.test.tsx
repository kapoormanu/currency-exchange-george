import React from 'react';
import { render, screen } from '@testing-library/react';

import Header from 'components/Header/Header';

describe('<Header/ >', () => {
    it('should have the header i18n key', () => {
        render(<Header />);

        expect(screen.getByRole('heading')).toHaveTextContent('header.title');
    });
});
