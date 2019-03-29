import { gql } from 'apollo-boost';

const getAuthorsQuery = gql`
  {
  	authors {
  	  name id
  	}
  }
`;

const getBooksQuery = gql`
  {
  	books {
  	  name genre id
  	}
  }
`;

const getBookQuery = gql`
  query($id: ID) {
    book(id: $id){
      id
      name
      genre
      author {
        id
        name
        age
        books {
          name
          id
        }
      }
    }
  }
`;

const addBookMutation = gql`
  mutation($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId){
      name
    }
  }
`;

const removeBookMutation = gql`
  mutation($name: String!) {
    removeBook(name: $name){
      name
    }
  }
`;

const updateBookMutation = gql`
  mutation($currentName: String!, $newName: String!, $newGenre: String!, $newAuthorId: ID!) {
    updateBook(currentName: $currentName, newName: $newName, genre: $newGenre, authorId: $newAuthorId) {
      name
      genre
      author{
        id
      }
    }
  }
`;


export { getAuthorsQuery, getBooksQuery, addBookMutation, getBookQuery, removeBookMutation, updateBookMutation };