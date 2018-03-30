import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Login extends Component {
  render() {
    return (
      <div>
        <form>
          <label>Email</label>
          <input type="email"></input>
          <label>Password</label>
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
