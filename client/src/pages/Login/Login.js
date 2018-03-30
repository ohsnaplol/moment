import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Login extends Component {
  render() {
    return (
      <div>
        <form>
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
      </div>
    )
  }
}

export default Login;
