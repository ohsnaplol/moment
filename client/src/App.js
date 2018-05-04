import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Home from "./pages/Home"
import Profile from "./pages/Profile"
import Settings from './pages/Settings'

import API from "./utils/API";
import NavBar from "./components/NavBar"

class App extends Component {
  constructor() {
    super()
    this.state = {
      loggedIn: false,
      id: null
    }

    this.getUser = this.getUser.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.updateUser = this.updateUser.bind(this)
  }

  componentDidMount() {
    this.getUser()
  }

  updateUser (userObject) {
    this.setState(userObject)
  }

  getUser() {
    API.validate()
      .then(response => {
        if (response.data.user) {
          console.log('Get User: There is a user saved in the server session: ')
          console.log(JSON.stringify(response.data.user._id))
          this.setState({
            loggedIn: true,
            id: response.data.user._id
          })
        } else {
          console.log('Get user: no user');
          this.setState({
            loggedIn: false,
            id: null
          })
        }
      })
  }

  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" render={() => (
              this.state.loggedIn ? (
                <div>
                  <NavBar updateUser={this.updateUser} loggedIn={this.state.loggedIn} id={this.state.id}/>
                  <Home uid={this.state.id} loggedIn={this.state.loggedIn}/>
                </div>
              ) : (
                <Login updateUser={this.updateUser} loggedIn={this.state.loggedIn}/>
              )
            )}/>
            <Route exact path="/signup" component={Signup} />
            <Route path="/profile/:id" render={({match}) => (
              <div>
                <NavBar updateUser={this.updateUser} loggedIn={this.state.loggedIn} id={this.state.id}/>
                <Profile viewer={this.state.id} id={match.params.id}/>
              </div>
            )} />
            <Route exact path="/settings/" render={() => (
              <div>
                <NavBar updateUser={this.updateUser} loggedIn={this.state.loggedIn} id={this.state.id}/>
                <Settings uid={this.state.id} updateUser={this.updateUser}/>
              </div>
            )} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
