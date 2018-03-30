import React, { Component } from "react";

class Login extends Component {
  render() {
    return (
      <div>
        <form>
          <p>Email</p>
          <input type="email"></input>
          <p>Password</p>
          <input type="password"></input>
          <p>Verify Password</p>
          <input type="password"></input>
          <button>Create Account</button>
        </form>
      </div>
    )
  }
}

export default Login;
