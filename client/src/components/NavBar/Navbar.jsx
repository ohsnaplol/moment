import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import API from "../../utils/API";
import SearchBar from '../Search'
// import "./style.css";


class Navbar extends Component {
  constructor() {
    super()
    this.state = {}
    this.logout = this.logout.bind(this)
  }

  logout(event) {
    event.preventDefault()
    console.log('logging out')
    API.logout().then(response => {
      console.log(response.data)
      if (response.status === 200) {
        this.props.updateUser({
          loggedIn: false,
          username: null
        })
        this.setState({
          redirectTo: '/'
        })
      }
    }).catch(error => {
      console.log('Logout error')
    })
  }

  render() {
    const loggedIn = this.props.loggedIn;
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />
    } else {
      return (
        <nav className="navbar sticky-top navbar-expand-sm navbar-light bg-light">
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {loggedIn ? (
              <ul className="navbar-nav mx-auto">
                <Link to="/" className="nav-item">
                  <li className="nav-link">Home</li>
                </Link>
                <SearchBar />
                <Link to={"/profile/" + this.props.id} className="nav-item">
                  <li className="nav-link">My Profile</li>
                </Link>
                <Link to="/settings" className="nav-item">
                  <li className="nav-link">Settings</li>
                </Link>
                <Link to="#" className="nav-item" onClick={this.logout}>
                  <li className="nav-link">Logout</li>
                </Link>
              </ul>
            ) : (
                <ul className="navbar-nav mx-auto">
                  <SearchBar />
                  <Link to="/" className="nav-item">
                    <li className="nav-link">login</li>
                  </Link>
                  <Link to="/signup" className="btn btn-link">
                    <li className="nav-link">sign up</li>
                  </Link>
                </ul>
              )}
          </div>
        </nav>
      );
    }
  }
}

export default Navbar