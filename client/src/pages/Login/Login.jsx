import React, { Component } from 'react'
import { withAlert } from 'react-alert'
import { Link, Redirect } from 'react-router-dom'
import API from "../../utils/API";
import "./style.css";
// This will be uncommented out, with the image tag, one we have an image with transparency around it. 
// import FLOWPINK from './flowtrans.png';

// Marcello, please dont kill, Sherwino made me do it.  He wanted to fix something. lol. 
class Login extends Component {
  constructor() {
    super()
    this.state = {
      email: "",
      password: "",
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }


  handleFormSubmit = event => {
    event.preventDefault()
    let password = this.state.password
    let email = this.state.email
    API.login({
      username: email,
      password: password
    }).then(response => {
      if (response.status === 200) {
        // update App.js state
        this.props.updateUser({
          loggedIn: true,
          id: response.data.username
        })
        // update the state to redirect to home
        this.setState({
          redirectTo: '/home'
        })
      } 
    }).catch(err => {
        // unknown user
      console.log("Username or password incorrect")
      // test unknown user react alert
      // pass component as a message
      this.props.alert.show(<div className="error-alert">Username or password incorrect</div>)
      // alert("Username or password incorrect")
      console.log('Error in login handleFormSubmit ' + err)
    })
    
  }

  handleInputChange = event => {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />
    } else {
    return (
      <div>
        <div className="container-div">
        <header className="header-class-login"> 
          <h1 className="solid-moment">
            Scoop
          </h1> 
          <h2 className="moment-faded">
            Scoop
          </h2> 
        </header> 
        <form className="login-form" onSubmit={this.handleFormSubmit}>
          <div className="email-input">
          <p>Welcome to Scoop. Your online self in one place.</p>
          <p>Please Login or Sign up</p>
            <label>
              <input placeholder= "Email" value={this.state.email} onChange={this.handleInputChange} name="email" type="email" autoComplete="current-email"/>
            </label>
          </div> 
          <div className="Password-Entry">
            <label>
              <input placeholder="Password" value={this.state.password} onChange={this.handleInputChange} name="password" type="password" autoComplete="current-password"/>
            </label>
          </div>
          {/* trying to create padding between pw & lgin bttn */}
          <div className="login-button-group">
          <p></p>
          </div>
          <div>
          <input className="login-button" type="submit" value="Log In"/>
          </div>
          <div>
            {/* switched to link vs bttn due to standard practice */}
          <Link to="/signup">
            <p className="create-link">Create Account</p>
          </Link>
          </div>
        </form>
      </div>
      </div>
    )
  }
  }
}

export default withAlert(Login);