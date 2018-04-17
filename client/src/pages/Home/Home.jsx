import React, { Component } from 'react'
import "./style.css";
import Logo from "./scoopload.svg";

// import { Link } from 'react-router-dom'

class Home extends Component {

  render() {
    return (
      <div className="welcome-home-h1">
        {this.props.loggedIn && 
          <h1>Welcome Home, {this.props.name}</h1>
        }
        <img src={Logo} className="scoopload"/>
      </div>
    )
  }
}

export default Home;
