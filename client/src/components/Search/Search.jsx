import React, { Component } from 'react'
// import Suggestions from './Suggestions.jsx'
import API from '../../utils/API'

class Search extends Component {
  state = {
    query: '',
    results: []
  };

  getInfo = () => {
    API.getUsers()
      .then(({ data }) => {
        this.setState({
          results: data.data
        })
      })
  };

  handleInputChange = () => {
    this.setState({
      query: this.search.value
    }, () => {
      if (this.state.query && this.state.query.length > 1) {
        if (this.state.query.length % 2 === 0) {
          API.getUsers()
        }
      } else if (!this.state.query) {
      }
    })
  };

  render() {
    return (
      <form>
        <input
          placeholder="Search for..."
          ref={input => this.search = input}
          onChange={this.handleInputChange}
        />
        {/* <Suggestions results={this.state.results} /> */}
      </form>
    )
  }
};

export default Search;