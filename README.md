# Hello Allica people!

Glad to see you made it here, I hope you're well.
Here's my SWAPI app, it should meet all the Acceptance criteria (apart from the bonus, which maybe we can talk about!).

I think there are some alterations I would make to my approach if this project were to be larger. first and foremost, I would use redux to manage state instead of the Context API. Although there is greater overhead in setting this up, I feel this is outweighed by the benefits gained, like Redux's devtools, utilisation of actions and reducers to manage growing state complexity as the app grows, etc.

next, there is more modularisation to be enjoyed through abstracting functionality to components, such as a 'pagination controls' component (tagged with data-testid "pagination_controls") as more pages will likely require this functionality, or perhaps a styled Link to look like a button.

To build off this, more concrete utilisation of Chakra's UI components, together with a custom colour palette, could create an easier foundation for consistent app styles and user experience.

Finally, a slight change in file structure could improve the navigation of the repo, especially for a first time user. by consolidating pages into their own folders (character pages live in folder "character_pages", for example) things are a little more structured. the same can be said for routes, and any other components made down the line.

Now, if you've checked the tests, you'll see that two test suites don't run. This seems to be caused by a dependency issue. I gave it a go at solving (some remnants remain), but couldn't crack it in a reasonable amount of time. I'll do my best to get this running by the time we talk about the challenge, but in the mean time I hope it is a reasonable enough example of the type of tests I would write! thankfully, tests found in api.test.ts should pass happily. Cypress tests should also pass when running the app locally with `npm start`, then `npx cypress open` to test the characters.cy.ts file.

If you made it this far, thank you, and I look forward to talking to you about this code!

Here's some create-react-app generated stuff

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
