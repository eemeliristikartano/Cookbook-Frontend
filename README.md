# Cookbook-Frontend
Frontend for my personal Cookbook-project. Link to the application below. Please note that if there is no traffic in a 30-minute period, server sleeps so there might be a short delay.

https://eemeliristikartano.github.io/Cookbook-Frontend

Cookbook-Backend repository: https://github.com/eemeliristikartano/Cookbook-Backend

 ## Cookbook is a web application where authenticated user can:
 - Create a new recipe
 - Update existing recipe
 - Read recipes
 - Delete recipes.

Non-authenticated user can:
 - Read recipes.
 
## Backend
- Java
- Spring Boot

## Frontend
 - TypeScript
 - React
 
  ## Database
 - Heroku Postgres
 
Authentication is done with JSON Web Token (JWT) using https://github.com/auth0/java-jwt.

# Diagrams

## Class diagram

![image](https://user-images.githubusercontent.com/92360393/210605316-e1d4251f-23fc-44b4-897a-32ba3aab9ef5.png)

## Java diagram
![image](https://user-images.githubusercontent.com/92360393/210605629-10be7dec-6438-497d-bec4-eb581c6826f3.png)

## Relational schema
![image](https://user-images.githubusercontent.com/92360393/210605852-55853a18-9ecd-466c-9df6-bc9d02e280e9.png)


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

**Note: this is a one-way operation. Once you `eject`, you can???t go back!**

If you aren???t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you???re on your own.

You don???t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn???t feel obligated to use this feature. However we understand that this tool wouldn???t be useful if you couldn???t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
