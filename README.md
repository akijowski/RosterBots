# Roster Bots
Sample Project By Adam Kijowski

## About
This is a simple full stack NodeJS/React web application.  The project is a
random Bot roster generator.  The server will randomly generate a roster consisting
of 10 starters and 5 substitutes.  Other league rules require that each Bot will
have 3 attributes:
- Speed
- Strength
- Agility

The total of these three attributes can not exceed 100 points per Bot, and each team
can not exceed 175 points when all Bot attributes are combined.  Finally, each Bot must have a unique alphanumeric name.

## Setup
:rotating_light: **IMPORTANT:** :rotating_light: The server will not start if MongoDB credentials are not provided.  This application uses a cloud instance of MongoDB for the data store.  These credentials can be provided as environment variables or in `server/package.json` as config variables.

This application was written on MacOS and should work without issue on \*nix systems.  

**To install** the application, from the `/src` directory, type `npm run install-app`.  This will kick off the `npm install` processes in both the client and server directories.

**To start** the entire application, from the `/src` directory, type `npm start` from your favorite console application.  This will host the server at `localhost:3001/` and the client at `localhost:3000/`.

## Client
### Technologies
The client side of the application is a simple React app written with the following frameworks:
- [Create React App](https://github.com/facebook/create-react-app)
- [Semantic UI](https://react.semantic-ui.com/)

The majority of my effort was in writing the server side of the application, therefore the client side is basic and does not include an abundance of features.  That being said I do believe it shows my abilities to develop a React front-end.
### Testing
Due to time constraints, I did not write tests for the client side of the application.  I would have used Jest and Enzyme, and possibly even tools such as [Cypress](https://www.cypress.io/).  I felt that the tests written for the server are a good representation of my test writing abilities.

## Server
### Technologies
The server side is a NodeJS server written using these frameworks:
- [Express](https://expressjs.com/)
- [Mongoose](https://mongoosejs.com)
- [Chai](https://www.chaijs.com/)

The server uses Express as the server application framework, and to primarily handle HTTP traffic.  Mongoose is used as the object mapping library to facilitate moving objects in and out of the MongoDB database.  
REST logic is saved in the `/routes` directory, Mongoose model info is in the `/model` directory, and MongoDB connection info is in the `/db` directory.  The `/generator` directory contains the functions for randomly generating a list of Bots as required.
### Testing
Unit tests are written using the Mocha and Chai frameworks and are in the `/test` directory.  Unit tests were written to cover the generator module and the REST endpoints.  I feel that these are a good representation of my testing abilities and style.

## To Do
If time allowed, or this was a larger project, some of the changes I would like to implement would be:
- [ ] Extend CRUD capabilities of the API
- [ ] Extend the client application capabilities
- [ ] Generate OpenAPI/Swagger docs for the API endpoints
- [ ] Write tests around client application
- [ ] Extend test coverage around API
- [ ] Verify cross-browser compatibility
