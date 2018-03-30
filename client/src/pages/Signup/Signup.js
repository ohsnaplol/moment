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
          <label>Email</label>
          <input type="email"></input>
          <label>Password</label>
          <input type="password"></input>
          <label>Verify Password</label>
          <input type="password"></input>
          <button onClick={this.handleFormSubmit}>Create Account</button>
        </form>
      </div>
    )
  }
}

export default Login;
