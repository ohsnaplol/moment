import React, { Component } from "react";
import { Link } from 'react-router-dom'
import API from "../../utils/API";

<<<<<<< HEAD
document.body.style.backgroundcolor = '#141320'; 

 const formStyle = { 
  width: '166px', 
  position: 'absolute', 
  left: '565px', 
  top: '171px', 
  textAlign: 'center', 
  background: 'lavenderblush'
  paddingLeft: '177px', 
  paddingRight: '177px', 
  paddingBottom: '56px', 
  paddingTop: '56px', 
  fontFamily:  'Helvetica', 
  borderRadius: '50px', 
  fontWeight: 'bold', 
} 

const buttonStyle = { 
      margin-top: '13px', 
 }

=======
>>>>>>> c548952e37f09148d98a211fbd3e6c4421bf672e
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
<<<<<<< HEAD

        <form style={formStyle} onSubmit={this.handleFormSubmit}>
=======
        <Link to="/">
          <button>Back to Login</button>
        </Link>
        <form onSubmit={this.handleFormSubmit}>
>>>>>>> c548952e37f09148d98a211fbd3e6c4421bf672e
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
<<<<<<< HEAD
          <input style={buttonStyle} type="submit" value="Create Account" />
          <Link to="/">
            <button style={buttonStyle} >Back to Login</button>
          </Link>
=======
          <input type="submit" value="Create Account" />
>>>>>>> c548952e37f09148d98a211fbd3e6c4421bf672e
        </form>
      </div>
    )
  }
}

<<<<<<< HEAD
export default Signup;
=======
export default Signup;
>>>>>>> c548952e37f09148d98a211fbd3e6c4421bf672e
