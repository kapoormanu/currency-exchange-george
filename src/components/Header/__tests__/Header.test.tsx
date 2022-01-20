import React from 'react';
import { render, screen } from '@testing-library/react';

import Header from '../Header';

describe('<Header/ >', () => {
    it('should have the header text', () => {
        render(<Header />);
        expect(screen.getByRole('heading')).toHaveTextContent('header.title');
    });
});
