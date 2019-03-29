import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';

import { getBooksQuery, removeBookMutation } from '../queries/queries';
 
class RemoveBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    }
  }
  displayBooks(){
    let data = this.props.getBooksQuery;
    if(!data.loading) {

      return data.books.map(book => <option key={ book.id } value={ book.name }>{ book.name }</option>);
    } else return <option disabled>Loading Books...</option>;
  }
  submitForm(e) {
    e.preventDefault();
    this.props.removeBookMutation({
      variables: {
        name: this.state.name
      },
      refetchQueries: [{ query: getBooksQuery}]
    });
  }
  render() {
    return (
      <form id="remove-book" onSubmit={ this.submitForm.bind(this) }>
        <div className="title">Remove Book</div>

        <div className="field">
          <label>Current book name:</label>
          <select onChange={ e => this.setState({name: e.target.value}) }>
            <option>Select book</option>
            { this.displayBooks() }
          </select>
        </div>

        {/*<div className="field">
          <label>Book name:</label>
          <input type="text" onChange={ e => this.setState({name: e.target.value}) }/>
        </div>*/}

        <button>-</button>

      </form>
    );
  }
}

export default compose(
  graphql(removeBookMutation, {name: "removeBookMutation"}),
  graphql(getBooksQuery, {name: "getBooksQuery"})
)(RemoveBook);