# George Currency FX App

This is an app created using CRA that lists exchange rates for major currencies, which can be filtered as per user search term.

## Basic Specifications
- [x] The page has:
    - [x] 1. A header and 
    - [x] 2. A search bar at the top.
- [ ] Below the header and the search bar appears a list of all currencies.
- [ ] When the user is scrolling the page, the header scrolls off the page, but the search bar sticks to the top and stays there.
- [ ] Each currency list item contains:    
    1. Flag of the country
    1. Name of the country
    1. Currency of the country
    1. Exchange rate of that currency

- [ ] The currencies are searchable. The list updates according to the value in search bar.
- [ ] The search term is also present in the URL hash, enabling deep linking to be used later.

## Enhanced Specifications
- [ ] The App shows a loader while results are loading.
- [ ] If no currencies are available or there were errors while fetching, show appropriate messages.
- [ ] The app uses Redux to manage data.
- [ ] Internationalization support.

## Commit Message Format

`<Type>: <Area of change/File>: Commit message`

### Possible values for Type:
* Feat: adding new feature to code
* Fix: fix existing implementation
* Test: Adding tests
* Refactor
* Style: Changes to styling only
* Chore: Setup/changes in tooling; changes to non-functional files(e.g. readme)

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
