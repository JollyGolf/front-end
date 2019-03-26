const express = require('express'); 
const graphqlHTTTP = require('express-graphql');
const schema = require('./schema/schema');

const app = express();
app.use('/graphql', graphqlHTTTP({
  schema          //equal schema: schema (both same name)
}));
app.listen(4000, () => console.log('Now listening for requests on port 4000'));