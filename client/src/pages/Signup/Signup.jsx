import React, { Component } from "react";
import { Redirect } from 'react-router-dom'
import { withAlert } from 'react-alert'
import API from "../../utils/API";
import "./style.css";
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
        <div className="all-contect-signup">
          <header>
            {/* <img src={mainLogo} className="honeydew"/>              */}
                        {/* version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	  width="106.167px" height="117.195px" viewBox="0 0 106.167 117.195" enable-background="new 0 0 106.167 117.195"
    xml:space="preserve"> */}
            <svg className="honey-signup">
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
		
              <ellipse className="honey-head" transform="matrix(0.9899 0.1416 -0.1416 0.9899 210 20)" fill="#ccff66" cx="54.196" cy="69.903" rx="43.351" ry="38.201"/>
		
              <ellipse transform="matrix(0.9899 0.1416 -0.1416 0.9899 210 20)" fill="#ccff66" cx="41.894" cy="106.733" rx="18.195" ry="9.59"/>
		
              <ellipse transform="matrix(0.9899 0.1416 -0.1416 0.9899 210 20)" fill="#ccff66" cx="68.167" cy="104.422" rx="18.195" ry="9.591"/>
		
              <ellipse transform="matrix(0.9899 0.1416 -0.1416 0.9899 210 20)" fill="#ccff66" cx="87.537" cy="97.503" rx="18.194" ry="9.592"/>
		
              <ellipse transform="matrix(0.9899 0.1416 -0.1416 0.9899 210 20)" fill="#ccff66" cx="18.702" cy="93.726" rx="18.195" ry="9.592"/>
	          </g>
              <path className="honey-stem" transform="matrix(0.9899 0.1416 -0.1416 0.9899 210 20)" fill="#F5DEB3" d="M68.673,22.524c0,0,3.6-17.221,11.463-22.524c0,0,3.871,1.068,2.842,2.46c0,0,0.129,1.768-1.176,2.238
		          l-1.398-1.989c0,0-5.793-0.131-9.715,19.514L68.673,22.524z"/>
              <circle className="honey-cherry" transform="matrix(0.9899 0.1416 -0.1416 0.9899 210 20)" fill="#C41617" cx="67.606" cy="28.795" r="10.673"/>
    	
		          <ellipse className="honey-leftEye" transform="matrix(0.989 -0.148 0.148 0.989 192 28)" fill="#010202" cx="40.374" cy="66.952" rx="1.359" ry="1.789"/>
	
		          <ellipse className="honey-rightEye" transform="matrix(0.9889 -0.1484 0.1484 0.9889 192 30)" fill="#010202" cx="70.142" cy="69.318" rx="1.359" ry="1.789"/>
              <path className="honey-mouth" transform="matrix(0.9899 0.1416 -0.1416 0.9899 213 20)" fill="#010202" d="M41.833,79.758l27.78,1.128C69.612,80.886,56.448,94.285,41.833,79.758z"/>
          </g>
        </svg> 
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
