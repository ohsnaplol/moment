import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import API from "../../utils/API";
import SearchBar from '../Search'
import "./style.css";


class Navbar extends Component {
  constructor() {
    super()
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
      }
    }).catch(error => {
      console.log('Logout error')
    })
  }

  render() {
    const loggedIn = this.props.loggedIn;

    return (
      <header className="navbar App-header" id="nav-container">
      {loggedIn ? (
        <section className="navbar-section">
          <Link to="/home" className="btn btn-link text-secondary">
            <span className="text-secondary">Home</span>
          </Link>
          <SearchBar />
          <Link to={"/profile/"+this.props.id} className="btn btn-link text-secondary">
            <span className="text-secondary">My Profile</span>
          </Link>
          <Link to="/settings" className="btn btn-link text-secondary">
            <span className="text-secondary">Settings</span>
          </Link>
          <Link to="#" className="btn btn-link text-secondary" onClick={this.logout}>
            <span className="text-secondary">Logout</span>
          </Link>
        </section>
      ) : (
          <section className="navbar-section">
            <SearchBar />
            <Link to="/" className="btn btn-link text-secondary">
              <span className="text-secondary">login</span>
            </Link>
            <Link to="/signup" className="btn btn-link">
              <span className="text-secondary">sign up</span>
            </Link>
          </section>
        )}
      </header>
    );
  }
}

export default Navbar