import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery
} from "../queries/queries";

class AddBook extends Component {
  state = {
    name: "",
    genre: "",
    authorId: ""
  };

  displayAuthors() {
    let data = this.props.getAuthorsQuery;
    console.log("here are props: ", this.props);

    if (data.loading) {
      return <option disabled>Loading Authors...</option>;
    } else {
      return data.authors.map(author => (
        <option key={author.id} value={author.id}>
          {author.name}
        </option>
      ));
    }
  }

  onChangeHandler = (event, field) => {
    let newState = {};
    newState[field] = event.target.value;
    this.setState({ ...newState });
    // console.log(this.state[field]);
  };

  submitForm(event) {
    event.preventDefault();
    // console.log(this.state);
    this.props.addBookMutation({
      variables: {
        name: this.state.name,
        genre: this.state.genre,
        authorId: this.state.authorId
      },
      refetchQueries: [{ query: getBooksQuery }]
    });
  }

  render() {
    return (
      <form id="add-book" onSubmit={this.submitForm.bind(this)}>
        <div className="field">
          <label>Book name</label>
          <input
            type="text"
            field="name"
            value={this.state.value}
            onChange={e => this.onChangeHandler(e, "name")}
          />
        </div>

        <div className="field">
          <label>Genre:</label>
          <input
            type="text"
            field="genre"
            onChange={e => this.onChangeHandler(e, "genre")}
          />
        </div>

        <div className="field">
          <label>Author:</label>

          <select onChange={e => this.onChangeHandler(e, "authorId")}>
            <option>Select author</option>
            {this.displayAuthors()}
          </select>
        </div>

        <button>+</button>
      </form>
    );
  }
}

export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);
