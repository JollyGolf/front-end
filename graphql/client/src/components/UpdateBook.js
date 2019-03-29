import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';

import { getAuthorsQuery, getBooksQuery, updateBookMutation } from '../queries/queries';


class UpdateBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentName: '',
      newName: '',
      newGenre: '',
      newAuthorId: ''
    }
  }
  displayAuthors() {
    let data = this.props.getAuthorsQuery;
    if(!data.loading) {
      return data.authors.map(author => <option key={ author.id } value={ author.id }>{ author.name }</option>); 
    } else return <option disabled>Loading Authors...</option>;
  }
  displayBooks(){
  	let data = this.props.getBooksQuery;
  	if(!data.loading) {

  	  return data.books.map(book => <option key={ book.id } value={ book.name }>{ book.name }</option>);
  	} else return <option disabled>Loading Books...</option>;
  }
  submitForm(e) {
    e.preventDefault();
    this.props.updateBookMutation({
      variables: {
      	currentName: this.state.currentName,
        newName: this.state.newName,
        newGenre: this.state.newGenre,
        newAuthorId: this.state.newAuthorId
      },
      refetchQueries: [{ query: getBooksQuery}]
    });
  }
  render() {
    return (
      <form id="update-book" onSubmit={ this.submitForm.bind(this) }>

        <div className="title">Update Book</div>

        <div className="field">
          <label>Current book name:</label>
          <select onChange={ e => this.setState({currentName: e.target.value}) }>
            <option>Select book</option>
            { this.displayBooks() }
          </select>
        </div>

        <div className="field">
          <label>New book name:</label>
          <input type="text" onChange={ e => this.setState({newName: e.target.value}) }/>
        </div>

        <div className="field">
          <label>New genre:</label>
          <input type="text" onChange={ e => this.setState({newGenre: e.target.value}) } value={this.state.currentGenre} />
        </div>

        <div className="field">
          <label>New author:</label>
          <select onChange={ e => this.setState({newAuthorId: e.target.value}) }>
            <option>Select author</option>
            { this.displayAuthors() }
          </select>
        </div>

        <button>⇄</button>

      </form>
    );
  }
}

export default compose(
  graphql(getAuthorsQuery, {name: "getAuthorsQuery"}),
  graphql(updateBookMutation, {name: "updateBookMutation"}),
  graphql(getBooksQuery, {name: "getBooksQuery"})
)(UpdateBook);