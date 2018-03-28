import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Login extends Component {
  render() {
    return (
      <div>
        <form>
          <p>Email</p>
          <input type="email"></input>
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
