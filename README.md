# George Currency FX App

This is an app created using CRA that lists exchange rates for major currencies, which can be filtered as per user search term.

## Setup

Run `nvm use && npm i` to install the required dependencies. Make sure `nvm` is installed.
If you don't want to use `nvm`, make sure that `node -v` returns a version greater than or equal to that present in the `.nvmrc` file. Then, run `npm i`;

## Basic Specifications

-   [x] The page has:
    -   [x] 1. A header and
    -   [x] 2. A search bar at the top.
-   [x] Below the header and the search bar appears a list of all currencies.
-   [x] When the user is scrolling the page, the header scrolls off the page, but the search bar sticks to the top and stays there.
-   [x] Each currency list item contains:

    1. Flag of the country
    1. Name of the country
    1. Currency of the country
    1. Exchange rate of that currency

-   [x] The currencies are searchable. The list updates according to the value in search bar.
-   [x] The search term is also present in the URL hash, enabling deep linking to be used later.

## Enhanced Specifications

-   [ ] The App shows a loader while results are loading.
-   [x] If no currencies are available or there were errors while fetching, show appropriate messages.
-   [x] The app uses Redux to manage data.
-   [x] Internationalization support. (partially implemented right now. ) Use `http://localhost:3000/?lng=<locale>`. Currently support en and de. Anything else fallsback to en.
        e.g. http://localhost:3000/?lng=de-AT
-   [ ] The implementation for CurrenciesList should be swappable with choice (e.g. basic table, paginated table)
-   [ ] Debounce search functionality to improve performance.
-   [ ] Integrate pre-commit hook for linting(using e.g. husky)

## API Library

Currently, axios is being used. However, it can be replaced by any Rest client.## Directory Structure

-   `- app` :The app component and global state management files are located in the root `app/` folder since they are logicallly related.
-   Each component has a dedicated folder for the TSX, CSS and tests for it. I feel this allows easier referencing within files and also makes the components very easy to add/remove, doing so together for all the parts.

> Opinion: I like to keep my types inside of the components for two reasons.
>
> 1. Global types (in the arc/types/ folder) should really be global and should be easy for anyone to grasp what those types are from reading the file. Adding all types to global would make it bloated.
> 1. Having them in the components makes it easy to infer from the import signature about the nature of the types. Types of a type
>    One option to explore is to have the types of each component in a related types file in the component folder to make it possible to replace implementations altogether and make adjustments based on the types.

    ```
    - components
        -- Component
            -- Component.tsx
            -- Component.module.css
            -- tests
                -- Component.test.tsx
                -- otherTests.ts
        -- Component
            -- Component.tsx
            -- Component.module.css
            -- tests
                -- Component.test.tsx
                -- otherTests.ts
    ```

-   `- i18n`: I18N files are stored under the i18n directory.

## Commit Message Format

`<Type>: <Area of change/File>: Commit message`

### Possible values for Type:

-   Feat: Adding new feature to code
-   Fix: Fix existing implementation
-   Test: Adding tests
-   Refactor
-   Style: Changes to code styling only (e.g. spaces, tabs, prettier changes)
-   Docs: Adding docs for anything
-   Chore: Setup/changes in tooling; changes to non-functional files(e.g. readme)

e.g. "Fix: SearchBox_Test: include name to be specific for search button"

---

---

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
