import React, { Component } from 'react'
import API from "../../utils/API"
import NetworkTag from '../../components/NetworkTag'

class Profile extends Component {
  render() {
    API.getUser(this.props.id)
      .then(response => {
        
      })
    return (
      <div>
        
      </div>
    )
  }
}

export default Profile;
