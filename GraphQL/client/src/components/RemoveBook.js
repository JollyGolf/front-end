import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import { getBooksQuery, removeBookMutation } from '../queries/queries';
 
class RemoveBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    }
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
          <label>Book name:</label>
          <input type="text" onChange={ e => this.setState({name: e.target.value}) }/>
        </div>

        <button>-</button>

      </form>
    );
  }
}

export default graphql(removeBookMutation, {name: "removeBookMutation"})(RemoveBook);