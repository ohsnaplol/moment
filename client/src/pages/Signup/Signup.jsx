import React, { Component } from "react";
import { Link, Redirect } from 'react-router-dom'
import { withAlert } from 'react-alert'
import API from "../../utils/API";
// import "./style.css";
import Logo from "../../components/Logo"
// import mainLogo from "./green.png";


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
        if (res.data.error) {
          this.props.alert.show('A user with this email already exists.')
        } else {
          this.props.alert.show('Account successfully created.')
          this.setState({ //redirect to login page (try to)
            redirectTo: '/'
          })
        }
      }).catch(error => console.log(error))
    } else {
      if (this.state.password1.length < 8)
        console.log("Password must be at least 8 characters")
      this.props.alert.show(<div>Password must be at least 8 characters</div>)
      // alert("Password must be at least 8 characters")
      if (this.state.password1 !== this.state.password2)
        console.log("Passwords do not match")
      this.props.alert.show(<div>Passwords do not match</div>)
    }
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
              <form className="card-body" onSubmit={this.handleFormSubmit}>
                <p>Create your Account</p>
                <div className="form-group">
                  <input
                    placeholder="Email"
                    className="form-control"
                    type="email"
                    value={this.state.email}
                    name="email"
                    onChange={this.handleInputChange}
                    autoComplete="email"
                  />
                </div>
                <div className="form-group">
                  <input placeholder="Password"
                    className="form-control"
                    type="password"
                    value={this.state.password1}
                    name="password1"
                    onChange={this.handleInputChange}
                    autoComplete="new-password"
                  />
                  <small>Must be at least 8 characters</small>
                </div>
                <div className="form-group">
                  <input
                    placeholder="Re-enter Password"
                    className="form-control"
                    type="password"
                    value={this.state.password2}
                    name="password2"
                    onChange={this.handleInputChange}
                    autoComplete="new-password"
                  />
                </div>
                <input className="btn btn-dark login-btn" type="submit" value="Create my account" />
                <div>
                  <Link to="/">
                    <p className="btn btn-secondary">Back to Login</p>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      )
    }
  }
}

export default withAlert(Signup);
