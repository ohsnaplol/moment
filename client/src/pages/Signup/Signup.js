import React, { Component } from "react";
import API from "../../utils/API";

class Login extends Component {
  state = {
    email: "",
    password1: "",
    password2: ""
  }

  handleInputChange = event => {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }

  handleFormSubmit = event => {
    event.preventDefault()
    console.log(event)
    // verify both passwords are the same
    if (this.state.password1 === this.state.password2) {
      let password = this.state.password1
      let email = this.state.email
      // check if email doesnt already exist in db
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <label>
            Email:
            <input 
              type="email" 
              value={this.state.email} 
              name="email"
              onChange={this.handleInputChange}
            ></input>
          </label>
          <label>
            Password:
            <input 
              type="password" 
              value={this.state.password1} 
              name="password1"
              onChange={this.handleInputChange}
            ></input>
          </label>
          <label>
            Verify Password:
            <input 
              type="password" 
              value={this.state.password2} 
              name="password2"
              onChange={this.handleInputChange}
            ></input>
          </label>
          <input type="submit" value="Create Account" />
        </form>
      </div>
    )
  }
}

export default Login;
