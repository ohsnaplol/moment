import React, { Component } from 'react'
import API from "../../utils/API"
import NetworkTag from '../../components/NetworkTag'
import "./style.css";


class Profile extends Component {
  constructor() {
    super()
    this.state = {
      realName: '',
      nicknames: [],
    }
    this.componentDidMount = this.componentDidMount.bind(this)
  }

  componentDidMount() {
    console.log('componentWillMount()')
    const testid = '5ac5aa2cfa8d2e1d862e57c2'
    console.log('profile props: ' + JSON.stringify(this.props))
    API.getUser(testid) // normally use this.props.id
      .then(response => {
        this.setState(response.data)
        console.log('user data: ' + JSON.stringify(this.state))
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    return (
      <div>
        <h1 className="h1-profile">{this.state.realName}</h1>
      </div>
      // <div> 
        
      // </div> 
    )
  }
}

export default Profile;
