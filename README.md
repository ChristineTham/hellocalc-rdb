## Hello Calc

Experimental advanced calculator, reimagined as a modern app.

Why do Javascript calculators have to emulate a physical device? Do we really want to hunt and peck virtual keys on a screen? On a tablet or smartphone, possibly, but not on a browser running on a computer with a keyboard and mouse.

This experiment reimagines a calculator as a modern app complete with
* Expression evaluator with history stack, variables, expression library
* Plotting
* Editor based block evaluations
* And yes, if you want it, a virtual calculator (with RPN logic)

This has been built on top of the [React Dashboard](https://github.com/flatlogic/react-dashboard) admin dashboard template. It uses the following technologies:
* [React](https://facebook.github.io/react/)
* [Bootstrap 4](http://getbootstrap.com/)
* [React Router](https://reacttraining.com/react-router/)
* [Redux](http://redux.js.org/)
* [GraphQL](http://graphql.org/)
* [Create React App](https://github.com/facebook/create-react-app)
* MathJS
* MathJAX
* Monaco Editor

## Quick Start

#### 1. Run `yarn install`

This will install both run-time project dependencies and developer tools listed
in [package.json](../package.json) file.

#### 2. Run `yarn dev`

This command will start the app with simultaneously with express server,
set up your database, start local server XAMPP, opensever, or other tool
to start database, connect to it in file 
```shell
src > data > sequelize.js.
```
Also go to  
```shell
src > data > schema.js 
```
and enable mutation. This preparation
will enable to realize CRUD operations locally

## License

[MIT](https://github.com/flatlogic/react-dashboard/blob/master/LICENSE.txt) and another [MIT](https://github.com/flatlogic/react-dashboard/blob/master/LICENSE-react-starter-kit.txt) from RSK.
