const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const app = express();

try {
  mongoose.connect('mongodb+srv://MedNote:1q2w3e4r@mednote.lhrwv.mongodb.net/MedNote?retryWrites=true&w=majority');
  mongoose.connection.once('open', () =>{
  console.log('connected to database');
  });
} catch (error) {
  console.log(error);
}

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql:true
}));

app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');

