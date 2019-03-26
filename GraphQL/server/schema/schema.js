const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString, GraphQLSchema} = graphql;

// dummy data

let books = [
  { name: 'Name of the Wind', genre: 'Sci-Fi', id: '1'},
  { name: 'Hronic of Amber', genre: 'Fantasy', id: '1'},
  { name: 'Game of Throne', genre: 'Fantasy', id: '1'},
  { name: 'Harry Potter', genre: 'Fantasy', id: '1'},
];

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
  	id: { type: GraphQLString },
  	name: { type: GraphQLString },
  	genre: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
  	book: { 
      type: BookType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) { // code to get data from db / other source
      	
      }
  	}
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
})