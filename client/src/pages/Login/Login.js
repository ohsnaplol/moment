import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Login extends Component {
  render() {
    return (
      <div>
        <form>
          <p>Username</p>
          <input type="text"></input>
          <p>Password</p>
          <input type="password"></input>
          <button type="submit">Login</button>
        </form>
        <Link to="/signup">
          <button>Create Account</button>
        </Link>
      </div>
    )
  }
}

export default Login;
