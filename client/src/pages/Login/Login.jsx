import React, { Component } from 'react'
import { Link, Redirect} from 'react-router-dom'
import API from "../../utils/API";

class Login extends Component {
  constructor() {
    super()
    this.state = {
      email: "",
      password: "",
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  handleFormSubmit = event => {
    event.preventDefault()
    let password = this.state.password
    let email = this.state.email
    API.login({
      username: email, 
      password: password
    }).then(response => {
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
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />
    } else {
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <label>
            Email:
            <input value={this.state.email} onChange={this.handleInputChange} name="email" type="email"/>
          </label>
          <label>
            Password:
            <input value={this.state.password} onChange={this.handleInputChange} name="password" type="password" />
          </label>
          <input type="submit" value="Login"/>
        </form>
        <Link to="/signup">
          <button>Create Account</button>
        </Link>
      </div>
    )
  }
  }
}

export default Login;