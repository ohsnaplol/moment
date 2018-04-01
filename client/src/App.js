import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Home from "./pages/Home"
// import API from "./utils/API";


class App extends Component {
  constructor() {
    super()
    this.state = {
      loggedIn: false,
      email: null
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
    // API.getUsers()
    //   .then(response => {
    //     console.log(JSON.stringify(response))
    //     if (response.data.user) {
    //       console.log('Get User: There is a user saved in the server session: ')
  
    //       this.setState({
    //         loggedIn: true,
    //         username: response.data.user.username
    //       })
    //     } else {
    //       console.log('Get user: no user');
    //       this.setState({
    //         loggedIn: false,
    //         username: null
    //       })
    //     }
    //   })
    // axios.get('/user/').then(response => {
      // console.log('Get user response: ')
      // console.log(response.data)
      // if (response.data.user) {
      //   console.log('Get User: There is a user saved in the server session: ')

      //   this.setState({
      //     loggedIn: true,
      //     username: response.data.user.username
      //   })
      // } else {
      //   console.log('Get user: no user');
      //   this.setState({
      //     loggedIn: false,
      //     username: null
      //   })
      // }
  }

  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/home" component={Home} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
