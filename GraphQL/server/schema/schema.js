const graphql = require('graphql');
const _ = require('lodash');
const Book = require('../models/book');
const Author = require('../models/author');

const { 
  GraphQLObjectType, 
  GraphQLString, 
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList
} = graphql;

// dummy data

// let books = [
//   { name: 'Name of the Wind', genre: 'Sci-Fi', id: '1', authorId: '4'},
//   { name: 'Hronic of Amber', genre: 'Fantasy', id: '2', authorId: '3'},
//   { name: 'Game of Throne', genre: 'Fantasy', id: '3', authorId: '2'},
//   { name: 'Harry Potter', genre: 'Fantasy', id: '4', authorId: '1'},
//   { name: 'Haha histore', genre: 'Sci-Fi', id: '5', authorId: '4'},
//   { name: 'HMagic of Five', genre: 'Fantasy', id: '6', authorId: '3'},
//   { name: 'HiperMedia children', genre: 'Fantasy', id: '7', authorId: '2'},
//   { name: 'More and more fucking awesome techs', genre: 'Fantasy', id: '8', authorId: '1'},
// ];

// let authors = [
//   {name: 'Juliya', age: 24, id: '1'},
//   {name: 'Anastasiya', age: 36, id: '2'},
//   {name: 'Maria', age: 20, id: '3'},
//   {name: 'Grigory', age: 95, id: '4'}
// ];

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
  	id: { type: GraphQLID },
  	name: { type: GraphQLString },
  	genre: { type: GraphQLString },
  	author: {
  	  type: AuthorType,
  	  resolve(parent, args) {
  	  	//return _.find(authors, {id: parent.authorId});
  	  	return Author.findById(parent.authorId);
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
        //return _.filter(books, { authorId: parent.id });
        return Book.find({authorId: parent.id})
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
      	//return _.find(books, {id: args.id});
      	return Book.findById(args.id);
      }
  	},
  	author: {
  	  type: AuthorType,
  	  args: { id: {type: GraphQLID } },
  	  resolve(parent, args){
  	  	//return _.find(authors, {id: args.id}); 
  	  	return Author.findById(args.id);
  	  }
  	},
  	books: {
  	  type: new GraphQLList(BookType),
  	  resolve(parent) {
  	  	//return books
  	  	return Book.find({});
  	  }
  	},
  	authors: {
  	  type: new GraphQLList(AuthorType),
  	  resolve(parent) {
  	  	//return authors
  	  	return Author.find({});
  	  }
  	}
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
  	addAuthor: {
  	  type: AuthorType,
  	  args: {
  	  	name: { type: GraphQLString },
  	  	age: { type: GraphQLInt }
  	  },
  	  resolve(parent, args) {
  	  	let author = new Author({
  	  	  name: args.name,
  	  	  age: args.age
  	  	});
  	  	return author.save();
  	  }
  	},
  	addBook: {
  	  type: BookType,
  	  args: {
  	  	name: { type: GraphQLString },
  	  	genre: { type: GraphQLString },
  	  	authorId: { type: GraphQLID }
  	  },
  	  resolve(parent, args) {
  	  	let book = new Book({
  	  	  name: args.name,
  	  	  genre: args.genre,
  	  	  authorId: args.authorId
  	  	});
  	  	return book.save();
  	  }
  	}
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});