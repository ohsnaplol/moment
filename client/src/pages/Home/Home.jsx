import React, { Component } from 'react'
// import { Link } from 'react-router-dom'

class Home extends Component {

  render() {
    return (
      <div>
        {this.props.loggedIn && 
          <h1>Welcome Home, {this.props.name}</h1>
        }
      </div>
    )
  }
}

export default Home;
