import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import BookList from './components/BookList';
import AddBook from './components/AddBook';
import RemoveBook from './components/RemoveBook';
import UpdateBook from './components/UpdateBook';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App" id="main">
          <h1>GraphQL</h1>
          <BookList />
          <AddBook />
          <RemoveBook />
          <UpdateBook />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
