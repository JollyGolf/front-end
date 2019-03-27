const express = require('express'); 
const graphqlHTTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://zhigamovsky:qwertykybcem@cluster0-mpgcc.mongodb.net/test');
mongoose.connection.once('open', () => console.log('\nConnected to MongoDB\n'));

const app = express();
app.use('/graphql', graphqlHTTTP({
  schema: schema,
  graphiql: true
}));

//mongoose.connect('mongodb+srv://zhigamovsky:qwertykybcem@cluster0-mpgcc.mongodb.net/test');


app.listen(4000, () => console.log('Now listening for requests on port 4000'));