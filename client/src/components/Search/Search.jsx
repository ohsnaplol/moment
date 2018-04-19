import React, { Component } from 'react'
// import Suggestions from './Suggestions.jsx'
import API from '../../utils/API'
import Autocomplete from 'react-autocomplete'

class Search extends Component {
  state = {
    value : '',
    results: []
  };

  getInfo = (query) => {
    if (query.trim()) {
      API.getUserByNames(query.trim())
      .then((data) => {
        this.setState({
          results: data.data
        })
      })
      .catch(err => {
        console.log(err)
      })
    } else {
      this.setState({
        results: []
      })
    }
  };

  handleInputChange = event => {
    const { value } = event.target
    this.setState({
      value: value
    })
    this.getInfo(value)
  }

  render() {
    return (
      <Autocomplete
        value= {this.state.value}
        renderItem= {(item, isHighlighted) => 
          <a href={`/profile/${item._id}`} key={item._id}>
            <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
              <p>{item.realName}</p>
            </div>
          </a>
        }
        getItemValue={results => results.email}
        onChange={this.handleInputChange}
        items= {this.state.results}
        menuStyle={{
          borderRadius: '3px',
          boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
          background: 'rgba(255, 255, 255)',
          padding: '2px 0',
          fontSize: '90%',
          position: 'fixed',
          overflow: 'auto',
          zIndex: '10',
          maxHeight: '50%', // TODO: don't cheat, let it flow to the bottom
        }}
      />
    )
  }
};

export default Search;