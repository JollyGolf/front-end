const express = require('express'); 
const graphqlHTTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

//allow cross-origin requests
app.use(cors());

//connect to mongoDB
mongoose.connect('mongodb+srv://zhigamovsky:qwertykybcem@cluster0-mpgcc.mongodb.net/test?retryWrites=true');
mongoose.connection.once('open', () => console.log('\nConnected to MongoDB\n'));


app.use('/graphql', graphqlHTTTP({
  schema: schema,
  graphiql: true
}));
				    //mongodb+srv://zhigamovsky:qwertykybcem@cluster0-mpgcc.mongodb.net/test?retryWrites=true
//mongoose.connect('mongodb+srv://zhigamovsky:qwertykybcem@cluster0-mpgcc.mongodb.nset/test');


app.listen(4000, () => console.log('Now listening for requests on port 4000'));