const graphql = require('graphql');
const _ = require('lodash');

const { 
  GraphQLObjectType, 
  GraphQLString, 
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList
} = graphql;

// dummy data

let books = [
  { name: 'Name of the Wind', genre: 'Sci-Fi', id: '1', authorId: '4'},
  { name: 'Hronic of Amber', genre: 'Fantasy', id: '2', authorId: '3'},
  { name: 'Game of Throne', genre: 'Fantasy', id: '3', authorId: '2'},
  { name: 'Harry Potter', genre: 'Fantasy', id: '4', authorId: '1'},
  { name: 'Haha histore', genre: 'Sci-Fi', id: '5', authorId: '4'},
  { name: 'HMagic of Five', genre: 'Fantasy', id: '6', authorId: '3'},
  { name: 'HiperMedia children', genre: 'Fantasy', id: '7', authorId: '2'},
  { name: 'More and more fucking awesome techs', genre: 'Fantasy', id: '8', authorId: '1'},
];

let authors = [
  {name: 'Juliya', age: 24, id: '1'},
  {name: 'Anastasiya', age: 36, id: '2'},
  {name: 'Maria', age: 20, id: '3'},
  {name: 'Grigory', age: 95, id: '4'}
];

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
  	id: { type: GraphQLID },
  	name: { type: GraphQLString },
  	genre: { type: GraphQLString },
  	author: {
  	  type: AuthorType,
  	  resolve(parent, args) {
  	  	return _.find(authors, {id: parent.authorId});
  	  }
  	}
  })
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt  },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return _.filter(books, { authorId: parent.id });
      }
    }
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
  	book: { 
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) { // code to get data from db / other source
      	return _.find(books, {id: args.id});
      }
  	},
  	author: {
  	  type: AuthorType,
  	  args: { id: {type: GraphQLID } },
  	  resolve(parent, args){
  	  	return _.find(authors, {id: args.id}); 
  	  }
  	},
  	books: {
  	  type: new GraphQLList(BookType),
  	  resolve(parent) {
  	  	return books
  	  }
  	},
  	authors: {
  	  type: new GraphQLList(AuthorType),
  	  resolve(parent) {
  	  	return authors
  	  }
  	}
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});