import React, { Component } from "react";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";

const getAuthorsQuery = gql`
  {
    authors {
      name
      id
    }
  }
`;

class AddBook extends Component {
  displayAuthors() {
    let data = this.props.data;
    if (data.loading) {
      return <div>Loading books...</div>;
    } else {
      return data.books.map(book => <li key={book.id}>{book.name}</li>);
    }
  }

  render() {
    return (
      
    );
  }
}

export default graphql(getBooksQuery)(AddBook);
