import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Home from "./pages/Home"
import Profile from "./pages/Profile"

import API from "./utils/API";
import NavBar from "./components/NavBar"

// Context experimentation
// const UserContext = React.createContext()
// // Then create a provider Component
// class MyProvider extends Component {
//   state = {
//     loggedIn: false,
//     id: null
//   }
//   render() {
//     return (
//       <UserContext.Provider value={{
//         state: this.state,
//         getUser() {
//           API.validate()
//             .then(response => {
//               console.log(JSON.stringify(response))
//               if (response.data.user) {
//                 console.log('CONTEXT: Get User: There is a user saved in the server session: ')
//                 this.setState({
//                   loggedIn: true,
//                   id: response.data.user._id
//                 })
//                 console.log('CONTEXT state: ' + JSON.stringify(this.state))
//               } else {
//                 console.log('Get user: no user');
//                 this.setState({
//                   loggedIn: false,
//                   username: null
//                 })
//               }
//             })
//         },
//         updateUser: (userObject) => {
//           this.setState(userObject)
//           console.log('context updateUser state set to ' + this.state)
//         }
//       }}>
//         {this.props.children}
//       </UserContext.Provider>
//     )
//   }
// }

class App extends Component {
  constructor() {
    super()
    this.state = {
      loggedIn: false,
      id: null,
      name: null
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
        console.log(JSON.stringify(response))
        if (response.data.user) {
          console.log('Get User: There is a user saved in the server session: ')
          console.log(JSON.stringify(response.data))
          this.setState({
            loggedIn: true,
            id: response.data.user._id
          })
          API.getUser(response.data.user._id)
            .then(response => {
              this.setState({
                name: response.data.realName
              })
              console.log('state: ' + JSON.stringify(this.state))
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
                <Redirect to="/home" />
              ) : (
                <Redirect to="/login"/>
              )
            )}/>
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/home" render={() => (
              <div>
                <NavBar updateUser={this.updateUser} loggedIn={this.state.loggedIn} id={this.state.id}/>
                <Home name={this.state.name} loggedIn={this.state.loggedIn}/>
              </div>
            )} />
            <Route exact path="/login" render={() => (
              <Login updateUser={this.updateUser} loggedIn={this.state.loggedIn}/>
            )}/>
            <Route exact path="/profile/:id" render={() => (
              <div>
                <NavBar updateUser={this.updateUser} loggedIn={this.state.loggedIn} id={this.state.id}/>
                <Profile />
              </div>
            )} />
            <Route exact path="/settings/" render={() => (
              <div>
                <NavBar updateUser={this.updateUser} loggedIn={this.state.loggedIn} id={this.state.id}/>
              </div>
            )} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
