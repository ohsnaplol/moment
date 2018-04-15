import React, { Component } from 'react'
import { withAlert } from 'react-alert'
// import AlertTemplate from 'react-alert-template-oldschool-dark'
import AlertTemplate from 'react-alert-template-basic'
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
      [name]: value    })
  }

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />
    } else {
    return (
      <div>
        <div className="container-div">
        <header className="header-class-login">  
            {/* version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	  width="106.167px" height="117.195px" viewBox="0 0 106.167 117.195" enable-background="new 0 0 106.167 117.195"
    xml:space="preserve"> */}
            <svg className="honey-login">
            {/* <g display="none">
	          <g display="inline">
		
			        <ellipse transform="matrix(0.9579 0.287 -0.287 0.9579 20.4702 -14.8719)" fill="#F1F7EE" cx="60.957" cy="62.379" rx="41.173" ry="36.28"/>
		
			        <ellipse transform="matrix(0.9579 0.287 -0.287 0.9579 29.1954 -8.6818)" fill="#F1F7EE" cx="44.208" cy="95.235" rx="17.28" ry="9.109"/>
		
			        <ellipse transform="matrix(0.9579 0.287 -0.287 0.9579 30.6884 -15.794)" fill="#F1F7EE" cx="69.211" cy="96.768" rx="17.28" ry="9.109"/>
		
			        <ellipse transform="matrix(0.9579 0.287 -0.287 0.9579 30.4132 -21.4538)" fill="#F1F7EE" cx="88.378" cy="93.002" rx="17.28" ry="9.109"/>
		
			        <ellipse transform="matrix(0.9579 0.287 -0.287 0.9579 23.9117 -3.6079)" fill="#F1F7EE" cx="24.261" cy="79.749" rx="17.28" ry="9.109"/>
	          </g>
	            <path display="inline" fill="#F5DEB3" d="M81.232,19.921c0,0,5.81-15.667,13.941-19.539c0,0,3.485,1.549,2.324,2.711
		          c0,0-0.129,1.678-1.421,1.937l-1.032-2.065c0,0-5.423-0.939-11.876,16.957H81.232z"/>
              <circle display="inline" fill="#C41617" cx="79.347" cy="25.66" r="10.136"/>
	            <ellipse display="inline" fill="#010202" cx="48.39" cy="57.658" rx="1.291" ry="1.699"/>
	            <ellipse display="inline" fill="#010202" cx="76.015" cy="64.078" rx="1.291" ry="1.699"/>
	            <path display="inline" fill="#010202" d="M47.955,69.892l25.932,4.975C73.887,74.867,59.633,85.595,47.955,69.892z"/>
            </g> */}
            <g>
	          <g>
		
              <ellipse className="honey-head" transform="matrix(0.9899 0.1416 -0.1416 0.9899 210 20)" fill="#dbff77" cx="54.196" cy="69.903" rx="43.351" ry="38.201"/>
		
              <ellipse transform="matrix(0.9899 0.1416 -0.1416 0.9899 210 20)" fill="#dbff77" cx="41.894" cy="106.733" rx="18.195" ry="9.59"/>
		
              <ellipse transform="matrix(0.9899 0.1416 -0.1416 0.9899 210 20)" fill="#dbff77" cx="68.167" cy="104.422" rx="18.195" ry="9.591"/>
		
              <ellipse transform="matrix(0.9899 0.1416 -0.1416 0.9899 210 20)" fill="#dbff77" cx="87.537" cy="97.503" rx="18.194" ry="9.592"/>
		
              <ellipse transform="matrix(0.9899 0.1416 -0.1416 0.9899 210 20)" fill="#dbff77" cx="18.702" cy="93.726" rx="18.195" ry="9.592"/>
	          </g>
              <path className="honey-stem" transform="matrix(0.9899 0.1416 -0.1416 0.9899 210 20)" fill="#F5DEB3" d="M68.673,22.524c0,0,3.6-17.221,11.463-22.524c0,0,3.871,1.068,2.842,2.46c0,0,0.129,1.768-1.176,2.238
		          l-1.398-1.989c0,0-5.793-0.131-9.715,19.514L68.673,22.524z"/>
              <circle className="honey-cherry" transform="matrix(0.9899 0.1416 -0.1416 0.9899 210 20)" fill="#C41617" cx="67.606" cy="28.795" r="10.673"/>
    	
		          <ellipse className="honey-leftEye" transform="matrix(0.989 -0.148 0.148 0.989 192 28)" fill="#010202" cx="40.374" cy="66.952" rx="1.359" ry="1.789"/>
	
		          <ellipse className="honey-rightEye" transform="matrix(0.9889 -0.1484 0.1484 0.9889 192 30)" fill="#010202" cx="70.142" cy="69.318" rx="1.359" ry="1.789"/>
              <path className="honey-mouth" transform="matrix(0.9899 0.1416 -0.1416 0.9899 215 20)" fill="#010202" d="M41.833,79.758l27.78,1.128C69.612,80.886,56.448,94.285,41.833,79.758z"/>
          </g>
        </svg>               
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
              <input placeholder= "Email" value={this.state.email} onChange={this.handleInputChange} name="email" type="email"/>
            </label>
          </div> 
          <div className="Password-Entry">
            <label>
              <input placeholder="Password" value={this.state.password} onChange={this.handleInputChange} name="password" type="password" />
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