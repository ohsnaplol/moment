import React, { Component } from 'react'
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
      console.log("User name or password incorrect")
      alert("Username or password incorrect")
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
        {/* <img src={ FLOWPINK }></img>  */}
        <div className="container-div">
        <header className="header-class-login"> 
          <h1 className="solid-moment">
            Moment
          </h1> 
          <h2 className="moment-faded">
            Moment
          </h2> 
        </header> 
        <form className="login-form" onSubmit={this.handleFormSubmit}>
          <div className="Email-Input">
          <h3>Welcome to Moment. Your online self in one place.</h3>
          <h4>Please Login or Sign up</h4>
            <label>
              <input placeholder= "Email" value={this.state.email} onChange={this.handleInputChange} name="email" type="email"/>
            </label>
          </div> 
          <div className="Password-Entry">
            <label>
              <input placeholder="Password" value={this.state.password} onChange={this.handleInputChange} name="password" type="password" />
            </label>
          </div>
          <div>
          </div>
          <div>
          <input className="login-button" type="submit" value="Log In"/>
          </div>
          <div>
          <Link to="/signup">
            Create Account
          </Link>
          </div>
        </form>
      </div>
      </div>
    )
  }
  }
}

export default Login;