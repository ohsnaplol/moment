import React, { Component } from "react";

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
        <button>Create Account</button>
      </div>
    )
  }
}

export default Login;
