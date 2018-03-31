import React, { Component } from "react";
import { Link } from 'react-router-dom'
import API from "../../utils/API";

class Signup extends Component {
  constructor() {
    super()
    this.state = {
      email: "",
      password1: "",
      password2: ""
    }
    // this.handleInputChange = this.handleInputChange.bind(this)
    // this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  handleInputChange = event => {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }

  handleFormSubmit = event => {
    event.preventDefault()
    let password = this.state.password1
    let email = this.state.email
    // verify both passwords are the same
    if (this.state.password1 === this.state.password2 && this.state.password1.length > 7) {
      // check if email doesnt already exist in db
      API.createUser({ 
        email: email, 
        password: password 
      }).then(res => {
        console.log('api create user res is ' + JSON.stringify(res))
        if(res.data.error) {
          console.log('entry exists')
        } else {
          this.setState({ //redirect to login page (try to)
            redirectTo: '/'
          })
        }
      }).catch(error => console.log(error))
    } else {
      if(this.state.password1.length < 8 )
        console.log("Password must be at least 8 characterse")
      if (this.state.password1 !== this.state.password2)
        console.log("Passwords do not match")
    }
  }

  render() {
    return (
      <div>
        <Link to="/">
          <button>Back to Login</button>
        </Link>
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

export default Signup;
