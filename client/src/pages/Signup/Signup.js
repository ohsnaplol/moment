import React, { Component } from "react";
import API from "../../utils/API";

class Login extends Component {

  handleFormSubmit = event => {
    event.preventDefault()
    console.log(event)
  }

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
          <button onClick={this.handleFormSubmit}>Create Account</button>
        </form>
      </div>
    )
  }
}

export default Login;
