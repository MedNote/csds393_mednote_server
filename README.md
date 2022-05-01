# MedNote(Server)
## _Electronic Health Record System_


MedNote(server) is a AWS based server which provide a GraphQL API to enable client to aquire informations.
## Features

- Open API allow client connection
- Allow user to update data in database
- Connect API with database


## Tech

MedNote Server uses AWS and MongoDB

- [AWS] - Amazong Web Service
- [MongoDB] - A non-relational database


MedNote Server has been packed and uploaded to git repository

## Installation

MedNote requires [Node.js](https://nodejs.org/) v10+ to run.
MedNote requires graphql to run.
MedNote requires mongoose to run.

Install the dependencies and devDependencies and start the server.

```sh
node app
```

For production environments...

```sh
npm install mongoose
npm install --save apollo-server graphql
```

## Plugins

MedNote is currently extended with the following plugins.

| Plugin | README |
| ------ | ------ |
| GitHub | [plugins/github/README.md][PlGh] |




## app.js


By default, the MedNote will expose port 4000, so change this within the app.js file is necessary.



```sh
vi app.js
```

This will open the app.js file and allow user to change configurations including API port, MongoDB cluster.


Once done, API is now ready to serve. :

```sh
node app
```

## Test
To test the API after setup the server.
MedNote provided a automated testing program which would using different input to activate a unit test on API querys and report the result.
To run this test user need to install Three package and mocha package
```sh
npm install three --save-dev
npm install mocha --save-dev
```

Since all configuration has been set properly, user just need to run the following command to conduct the test:

```sh
cd test
npm test
```
## License

MedNote


