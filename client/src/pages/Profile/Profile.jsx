import React, { Component } from 'react'
import API from "../../utils/API"
import NetworkTag from '../../components/NetworkTag'

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {
    const testid = '5abf27fa76137fc004c2f9d4'
    API.getUser(testid) // normally use this.props.id
      .then(response => {
        this.setState(response.data)
      })
  }

  render() {
    // const {realName, nicknames} = response.data
    return (
      <div>
        <h1>{this.state.realName}</h1>
      </div>
    )
  }
}

export default Profile;
