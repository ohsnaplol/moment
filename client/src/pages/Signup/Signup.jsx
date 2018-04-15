import React, { Component } from "react";
import { Redirect } from 'react-router-dom'
import { withAlert } from 'react-alert'
import API from "../../utils/API";
import "./style.css";


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
        console.log("Password must be at least 8 characters")
        this.props.alert.show(<div className="error-alert">Password must be at least 8 characters</div>)
        // alert("Password must be at least 8 characters")
      if (this.state.password1 !== this.state.password2)
        console.log("Passwords do not match")
        this.props.alert.show(<div className="error-alert">Passwords do not match</div>)
        // alert("Passwords do not match")
    }
  }

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo}} />
    } else {
      return (
        <div>
          <header> 
            <div className="Moment-login-page">
              <h1 className="solid-moment">
                Scoop
              </h1>
              <h2 className="moment-faded">
                Scoops
              </h2>
            </div> 
          </header> 
          <form className="signup-form" onSubmit={this.handleFormSubmit}>
          <div className="email-entry"> 
            <p className="create-prompt">Create your Account</p>
            <label>
              <input 
              placeholder= "Email" 
              className="email-entry-text" 
              type="email" 
              value={this.state.email} 
              name="email" 
              onChange={this.handleInputChange}
              autoComplete="email"
              >
              </input>
            </label>
            </div> 
            <div className="password-entry"> 
            <label>
              <input placeholder= "Password" 
              className="password-entry-text" 
              type="password" 
              value={this.state.password1} 
              name="password1" 
              onChange={this.handleInputChange}
              autoComplete="new-password"
              >
              </input>
            </label>
            </div> 
            <div className="password-verify"> 
            <label>
              <input 
                placeholder= "Re-enter Password" 
                className="password-verify-text"
                type="password" 
                value={this.state.password2} 
                name="password2"
                onChange={this.handleInputChange}
                autoComplete="new-password"
                >
              </input>
            </label>
            </div>
            <div>
            <input className="create-account" type="submit" value="Create my account" />
            </div>
            {/* <Link to="/">
            <button className="back-login">Back to Login</button>
          </Link> */}
          </form>
        </div>
      )
    }
  }
}

export default withAlert(Signup);
