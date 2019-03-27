import React, { Component } from 'react';
import BookList from './components/BookList';

class App extends Component {
  render() {
    return (
      <div className="App" id="main">
        <h1>Zhigamovsky</h1>
        <BookList />
      </div>
    );
  }
}

export default App;
