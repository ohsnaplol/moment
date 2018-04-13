import React, { Component } from 'react'
// import Suggestions from './Suggestions.jsx'
import API from '../../utils/API'
import Autocomplete from 'react-autocomplete'

class Search extends Component {
  state = {
    value : '',
    results: []
  };

  getInfo = () => {
    API.getUsers()
      .then((data) => {
        this.setState({
          results: data.data
        })
      })
  };

  handleInputChange = event => {
    const { name, value } = event.target
    this.setState({
      value: value
    })
    this.getInfo()
  }

  render() {
    console.log(this.state.results)
    return (
      <Autocomplete
        value= {this.state.value}
        renderItem= {(item, isHighlighted) => 
          <div key={item._id} style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
            {item.email}
          </div>
        }
        getItemValue={results => results.email}
        onChange={this.handleInputChange}
        items= {this.state.results}
      />
    )
  }
};

export default Search;