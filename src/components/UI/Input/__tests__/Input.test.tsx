import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Input from '../Input';

describe('<Input />', () => {
    it('renders the input field with label as per provided data', () => {
        const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => e.target.value;
        const placeholderText = 'placeholder text';
        render(
            <Input
                type='search'
                name='fieldName'
                id='fieldName'
                value='test'
                label='testLabel'
                placeholder={placeholderText}
                onChange={handleOnChange}
            />
        );
        const inputWithPlaceholder = screen.getByPlaceholderText(placeholderText);

        expect(inputWithPlaceholder).toBeInTheDocument();
    });

    it('calls the onchange function on typing', () => {
        const handleOnChange = jest.fn();
        const placeholderText = 'placeholder text';
        render(
            <Input
                type='search'
                name='fieldName'
                id='fieldName'
                value='test'
                label='testLabel'
                placeholder={placeholderText}
                onChange={handleOnChange}
            />
        );
        const inputWithPlaceholder = screen.getByPlaceholderText(placeholderText);

        userEvent.type(inputWithPlaceholder, 'test');
        expect(handleOnChange).toHaveBeenCalled();
    });
});
