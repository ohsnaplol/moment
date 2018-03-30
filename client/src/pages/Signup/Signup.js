import React, { Component } from "react";
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
      console.log('lets get users')
      API.getUsers({ email: email }, function(err, docs) {
        console.log('getUsers inside')
        if (docs.length) {
          console.log("Email already exists")
        } else {
          API.createUser({ 
            email: email, 
            password: password 
          })
            .then(res => {
              console.log(res)
              this.setState({ //redirect to login page
                redirectTo: '/'
              })
            })
            .catch(error => console.log(error))
        }
      })
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
