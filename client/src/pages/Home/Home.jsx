import React, { Component } from 'react'
import NavBar from '../../components/NavBar'
// import { Link } from 'react-router-dom'

class Home extends Component {
  // constructor() {
  //   super()
  // }

  render() {
    return (
      <div>
        <NavBar />
        {this.state.loggedIn &&
          <p>Join the party, {this.state.username}!</p>
        }
        <h1>Welcome Home</h1>
      </div>
    )
  }
}

export default Home;
