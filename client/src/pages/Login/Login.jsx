import React, { Component } from 'react'
import { withAlert } from 'react-alert'
import { Link, Redirect } from 'react-router-dom'
import API from "../../utils/API";
import "./style.css";
import Logo from "../../components/Logo"
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
    const {email, password} = this.state
    if (email && password) {
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
        this.props.alert.show(<div>Username or password incorrect</div>)
        // alert("Username or password incorrect")
        console.log('Error in login handleFormSubmit ' + err)
      })
    }
  }

  handleInputChange = event => {
    const { name, value } = event.target
    this.setState({
      [name]: value    })
  }

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />
    } else {
    return (
      <div className="container">
        <div className="row">
          <header className="col-md-6">
            <div className="scoop-headline">
              <Logo />
            </div>
          </header> 
          <div className="card col-md-6 login-card">
            <form onSubmit={this.handleFormSubmit} className="card-body">
              <p>Welcome to Scoop. Your online self in one place.</p>
              <p>Please Login or Sign up</p>
              <div className="form-group">
                <input className="form-control" placeholder= "Email" value={this.state.email} onChange={this.handleInputChange} name="email" type="email" autoComplete="current-email"/>
              </div> 
              <div className="form-group">
                <input className="form-control" placeholder="Password" value={this.state.password} onChange={this.handleInputChange} name="password" type="password" autoComplete="current-password"/>
              </div>
              <button className="btn btn-dark login-btn" type="submit">Log In</button>
              <br/>
              <Link to="/signup">
                <button className="btn btn-secondary">Create Account</button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    )
  }
  }
}

export default withAlert(Login);