import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import API from "../../utils/API";
import NetworkTag from '../../components/NetworkTag'

class Login extends Component {
  constructor() {
    super()
    this.state = {
      email: "",
      password: "",
    }
    // this.handleInputChange = this.handleInputChange.bind(this)
    // this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  handleFormSubmit = event => {
    event.preventDefault()
    let password = this.state.password1
    let email = this.state.email
    API.login({
      email: email,
      password: password
    }).then(response => {
      console.log('Login response: ' + response)
      if (response.status === 200) {
        // update App.js state
        this.props.updateUser({
          loggedIn: true,
          username: response.data.username
        })
        // update the state to redirect to home
        this.setState({
          redirectTo: '/home'
        })
    }
    }).catch(err => {
      console.log('Error in login handleFormSubmit ' + err)
    })
  }

  handleInputChange = event => {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <label>
            Email:
            <input type="email"/>
          </label>
          <label>
            Password:
            <input type="password" />
          </label>
          <input type="submit" value="Login"/>
        </form>
        <Link to="/signup">
          <button>Create Account</button>
        </Link>
        <p>Sample user profile:</p>
        <NetworkTag network='facebook'/>
        <NetworkTag network='snapchat' username='blimey123'/>
        <NetworkTag network='twitch'/>
        <NetworkTag network='twitter'/>
      </div>
    )
  }
}

export default Login;
