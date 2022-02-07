import React, { FC, ReactElement } from 'react';
import { render as testingLibraryRender, RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';

import { store } from 'app/store';

const Providers: FC = ({ children }) => {
    return <Provider store={store}>{children}</Provider>;
};
/* This wraps whatever UI element is passed with the redux provider
   and returns the wrapped container.
 */
const render = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
    testingLibraryRender(ui, { wrapper: Providers, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { render };
